package com.mrurec.lifegoals

import org.junit.jupiter.api.Test
import org.springframework.modulith.core.ApplicationModules
import org.springframework.modulith.docs.Documenter

class ModularityTests {
    private val modules = ApplicationModules.of(LifeGoalsApplication::class.java)

    @Test
    fun `verifies module boundaries`() {
        modules.verify()
    }

    @Test
    fun `writes documentation snippets`() {
        val options = Documenter.Options.defaults().withOutputFolder("build/spring-modulith-docs")
        Documenter(modules, options)
            .writeModulesAsPlantUml()
            .writeIndividualModulesAsPlantUml()
    }
}
