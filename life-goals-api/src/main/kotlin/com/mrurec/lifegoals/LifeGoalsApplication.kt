package com.mrurec.lifegoals

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.modulith.Modulithic

@SpringBootApplication
@Modulithic
class LifeGoalsApplication

fun main(args: Array<String>) {
    runApplication<LifeGoalsApplication>(*args)
}
