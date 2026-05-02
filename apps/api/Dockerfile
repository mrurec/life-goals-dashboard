# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — Build
# Uses the official Gradle image so the daemon version exactly matches the
# project toolchain; no wrapper download needed at build time.
# ─────────────────────────────────────────────────────────────────────────────
FROM gradle:9.4.1-jdk25 AS builder

WORKDIR /app

# Copy dependency descriptors first so that Docker can cache the resolved
# dependency layer independently of any source changes.
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle/ gradle/

# Resolve and cache dependencies — separate layer so source changes don't
# re-download the world.
RUN gradle dependencies --no-daemon --quiet || true

# Copy source tree and build the executable fat JAR (tests are excluded —
# they require Testcontainers / Docker-in-Docker which is not available here).
COPY src/ src/
RUN gradle bootJar --no-daemon -x test

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Runtime
# Minimal JRE image. The application runs as a dedicated non-root user so that
# a compromised JVM process cannot write to the filesystem or escalate.
# ─────────────────────────────────────────────────────────────────────────────
FROM eclipse-temurin:25-jre-noble AS runtime

RUN groupadd --system appgroup \
    && useradd --system --gid appgroup --no-create-home appuser

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

RUN chown appuser:appgroup app.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
