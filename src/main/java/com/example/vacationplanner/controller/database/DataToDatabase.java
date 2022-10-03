package com.example.vacationplanner.controller.database;

import org.jsoup.Jsoup;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashSet;

public class DataToDatabase {

    private String firstName;
    private String lastName;
    private String fullname;
    private String tdText;
    private String teamName;
    private String weeks;
    private String numberString;
    private int weekNumber;
    private int nrOfRows = 0;

    public void TeamDataToDatabase(JdbcTemplate jdbcTemplate, String page) {
        HashSet<String> uniqueTeams = new HashSet<>();
        for (int i = 2; i < 52; i++) {
            teamName = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(0).text();
            if (teamName.isEmpty()) {
                continue;
            }
            uniqueTeams.add(teamName);
        }
        String[] teams = uniqueTeams.toArray(new String[uniqueTeams.size()]);
        for (int i = 0; i < uniqueTeams.size(); i++) {
            String teamSql = "Insert INTO team (team_name) VALUES ('" + teams[i] + "')";
            jdbcTemplate.update(teamSql);
        }
        System.out.println("rows has been inserted into team-table");
    }

    public void employeeDataToDatabase(JdbcTemplate jdbcTemplate, String page) {
        int nrOfRows = 0;
        for (int i = 2; i < 50; i++) {
            teamName = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(0).text();
            fullname = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(1).text();

            firstName = fullname.substring(0, fullname.indexOf(" ") + 1);
            lastName = fullname.substring(fullname.indexOf(" ") + 1);
            if (fullname.isEmpty()) {
                continue;
            }
            String resultID = jdbcTemplate.queryForObject("SELECT id FROM team WHERE team_name = '" + teamName + "'"
                    , String.class);
            String namesSql = "Insert INTO employee (first_name, last_name, team_id) VALUES ('" + firstName + "'," +
                    "'" + lastName + "','" + resultID + "')";
            jdbcTemplate.execute(namesSql);
            nrOfRows++;
        }
        System.out.println("rows has been inserted into employee-table");
    }

    public void weekDataToDatabase(JdbcTemplate jdbcTemplate, String page) {
        for (int i = 0; i < 21; i++) {
            weeks = Jsoup.parse(page).select("tr").get(0)
                    .select("td").get(i).text();
            numberString = weeks.substring(weeks.indexOf(" ") + 1);
            weekNumber = Integer.parseInt(numberString);

            String namesSql = "Insert INTO week (week_number) VALUES ('" + weekNumber + "')";
            jdbcTemplate.update(namesSql);
        }
        System.out.println("rows has been inserted into week-table");
    }

    public void vacactionDataToDataBase(JdbcTemplate jdbcTemplate, String page) {
        for (int row = 2; row < 52; row++) {
            String fullName = Jsoup.parse(page).select("tr").get(row)
                    .select("th").get(1).text();

            firstName = fullName.substring(0, fullName.indexOf(" ") + 1);
            lastName = fullName.substring(fullName.indexOf(" ") + 1);

            for (int column = 0; column < 21; column++) {
                tdText = Jsoup.parse(page).select("tr").get(row)
                        .select("td").get(column).text();
                weeks = Jsoup.parse(page).select("tr").get(0)
                        .select("td").get(column).text().replaceAll("week ", "");

                numberString = weeks.substring(weeks.indexOf(" ") + 1);
                weekNumber = Integer.parseInt(numberString);
                if (!tdText.isEmpty()) {
                    String employeeID = jdbcTemplate.queryForObject("SELECT id FROM employee WHERE first_name" +
                                    " = '" + firstName + "'"
                                    + " AND last_name = '" + lastName + "'"
                            , String.class);

                    String weekID = jdbcTemplate.queryForObject("SELECT id FROM week WHERE week_number" +
                                    " = '" + weekNumber + "'"
                            , String.class);

                    String namesSql = "Insert INTO vacation (employee_id, week_id, text) VALUES ('" + employeeID + "'," +
                            "'" + weekID + "','" + tdText + "')";
                    jdbcTemplate.execute(namesSql);
                    nrOfRows++;
                } else {
                    continue;
                }
            }

        }
        System.out.println(nrOfRows + " rows has been inserted into vacation-table");

    }

    public void deleteTableData(String tableName, JdbcTemplate jdbcTemplate) {
        String truncate = "TRUNCATE TABLE " + tableName + " RESTART IDENTITY";
        jdbcTemplate.update(truncate);
    }

    public void resetAllTables(JdbcTemplate jdbcTemplate) {
        String truncate = "TRUNCATE TABLE vacation, week, employee, team RESTART IDENTITY";
        jdbcTemplate.update(truncate);

        System.out.println("Reset tables - done");
    }


}
