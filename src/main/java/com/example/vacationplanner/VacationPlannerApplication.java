package com.example.vacationplanner;

import com.example.vacationplanner.database.DataToDatabase;
import webScraper.HTMLunitClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLDataException;

@SpringBootApplication
public class VacationPlannerApplication implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(VacationPlannerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        String USERNAME = "erihol";
        String PASSWORD = "Apelsin22";

        HTMLunitClient client = new HTMLunitClient(USERNAME, PASSWORD);
        client.login();

       String page = client.get("https://confluence.services.kambi.com/display/BOS/Vacation+Bet+Offer+Stream");


        DataToDatabase dbc = new DataToDatabase();
        dbc.teamDataToDatabase(jdbcTemplate,page, dbc.numberOfRows(page));
        dbc.employeeDataToDatabase(jdbcTemplate,page, dbc.numberOfRows(page));
        dbc.weekDataToDatabase(jdbcTemplate, page, dbc.numberOfColumns(page));
        dbc.vacationDataToDataBase(jdbcTemplate,page, dbc.numberOfColumns(page), dbc.numberOfRows(page));
        dbc.numberOfRows(page);

      //  System.out.println("number of TBodys: " + dbc.numberOfTbodys(page));
      //  System.out.println("number of Rows:" + dbc.numberOfRows(page));
      //  System.out.println("number of Columns" + dbc.numberOfColumns(page));

    }
}

