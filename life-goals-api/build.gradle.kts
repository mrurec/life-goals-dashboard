plugins {
    kotlin("jvm") version "2.3.20"
    kotlin("plugin.spring") version "2.3.20"
    kotlin("plugin.jpa") version "2.3.20"
    id("org.springframework.boot") version "4.0.5"
    id("io.spring.dependency-management") version "1.1.7"
    id("com.netflix.dgs.codegen") version "8.3.0"
    id("org.jlleitschuh.gradle.ktlint") version "14.2.0"
}

group = "com.mrurec"
version = "0.0.1-SNAPSHOT"
description = "life-goals-api"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

repositories {
    mavenCentral()
}

extra["dgsFrameworkVersion"] = "11.1.0"

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.springframework.boot:spring-boot-starter-flyway")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    implementation("org.springframework.boot:spring-boot-starter-websocket")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")

    implementation("com.netflix.graphql.dgs:graphql-dgs-spring-graphql-starter")

    // Spring Modulith: module boundary enforcement + transactional event publication.
    // See docs/adr/ADR-004-module-boundary-enforcement.md
    implementation(platform("org.springframework.modulith:spring-modulith-bom:2.0.5"))
    implementation("org.springframework.modulith:spring-modulith-starter-core")
    implementation("org.springframework.modulith:spring-modulith-starter-jpa")

    testImplementation("org.testcontainers:testcontainers-junit-jupiter")
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("org.springframework.boot:spring-boot-testcontainers")
    testImplementation("com.redis:testcontainers-redis:2.2.2")
    testImplementation("org.testcontainers:testcontainers-postgresql")
    testImplementation("io.mockk:mockk:1.14.9")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.springframework.modulith:spring-modulith-starter-test")
    // ArchUnit removed per ADR-004; add back only when a non-Modulith-expressible rule appears.

    runtimeOnly("org.postgresql:postgresql")
    runtimeOnly("org.flywaydb:flyway-database-postgresql")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

dependencyManagement {
    imports {
        mavenBom("com.netflix.graphql.dgs:graphql-dgs-platform-dependencies:${property("dgsFrameworkVersion")}")
    }
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict", "-Xjspecify-annotations=strict", "-Xannotation-default-target=param-property")
    }
}

tasks.generateJava {
    schemaPaths.add("$projectDir/src/main/resources/graphql-client")
    packageName = "com.mrurec.lifegoals.codegen"
    generateClient = true
}

tasks.withType<Test> {
    useJUnitPlatform()
}
