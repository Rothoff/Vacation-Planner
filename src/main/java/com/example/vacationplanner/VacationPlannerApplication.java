package com.example.vacationplanner;

import WebScraper.HTMLunitClient;
import com.example.vacationplanner.Database.DataToDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
@SpringBootApplication
public class VacationPlannerApplication implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public static void main(String[] args) {
        SpringApplication.run(VacationPlannerApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        String USERNAME = "frerot";
        String PASSWORD = "Fredde123!";

        HTMLunitClient client = new HTMLunitClient(USERNAME, PASSWORD);
        client.login();

        String page = client.get("https://confluence.services.kambi.com/display/BOS/Vacation+Bet+Offer+Stream");

        new DataToDatabase().TeamDataToDatabase(jdbcTemplate,page);
    }
}

