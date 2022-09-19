package com.example.vacationplanner.Database;

import org.jsoup.Jsoup;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashSet;

public class DataToDatabase {

    public void collectAllData() {

    }

    public void TeamDataToDatabase(JdbcTemplate jdbcTemplate, String page) {
        HashSet<String> uniqueTeams = new HashSet<>();
        for (int i = 2; i < 52; i++) {
            String team = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(0).text();
            if (team.isEmpty()) {
                continue;
            }
            uniqueTeams.add(team);
        }
        String[] teams = uniqueTeams.toArray(new String[uniqueTeams.size()]);
        for (int i = 0; i < uniqueTeams.size(); i++) {
            String teamSql = "Insert INTO team (team_name) VALUES ('" + teams[i] + "')";
            jdbcTemplate.update(teamSql);
        }
        System.out.println(teams.length + " rows has been inserted into team-table");
    }

    public void employeeDataToDatabase(JdbcTemplate jdbcTemplate, String page) {
        String firstName;
        String lastName;
        String teamName;
        int nrOfRows = 0;
        for (int i = 2; i < 52; i++) {
            teamName = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(0).text();
            String fullname = Jsoup.parse(page).select("tr").get(i)
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
        System.out.println(nrOfRows + " rows has been inserted into employee-table");
    }

    public void weekDataToDatabase(JdbcTemplate jdbcTemplate, String page) {
        int[] weekNumber = new int[21];
        for (int i = 0; i < 21; i++) {
            String weeks = Jsoup.parse(page).select("tr").get(0)
                    .select("td").get(i).text();
            String number = weeks.substring(weeks.indexOf(" ") + 1);
            weekNumber[i] = Integer.parseInt(number);

            String namesSql = "Insert INTO weeks (week_number) VALUES ('" + weekNumber[i] + "')";
            jdbcTemplate.update(namesSql);
        }
        System.out.println(weekNumber.length + " rows has been inserted into week-table");
    }

    public void vacactionDataToDataBase(JdbcTemplate jdbcTemplate, String page) {
        String firstName;
        String lastName;
        String vacationOrNah;
        int nrOfRows = 0;
        int[] weekNumber = new int[200];


        for (int row = 2; row < 52; row++) {
            String fullName = Jsoup.parse(page).select("tr").get(row)
                    .select("th").get(1).text();

            firstName = fullName.substring(0, fullName.indexOf(" ") + 1);
            lastName = fullName.substring(fullName.indexOf(" ") + 1);

            for (int column = 0; column < 21; column++) {
                vacationOrNah = Jsoup.parse(page).select("tr").get(row)
                        .select("td").get(column).text();
                String weeks = Jsoup.parse(page).select("tr").get(0)
                        .select("td").get(column).text().replaceAll("week ","");

                String number = weeks.substring(weeks.indexOf(" ") + 1);
                weekNumber[row] = Integer.parseInt(number);
                if (!vacationOrNah.isEmpty()) {
                    String employeeID = jdbcTemplate.queryForObject("SELECT id FROM employee WHERE first_name" +
                                    " = '" + firstName + "'"
                                    + " AND last_name = '" + lastName + "'"
                            , String.class);

                    String weekID = jdbcTemplate.queryForObject("SELECT id FROM weeks WHERE week_number" +
                                    " = '" + weekNumber[row] + "'"
                            , String.class);

                    String namesSql = "Insert INTO vacation (employee_id, week_id, text) VALUES ('" + employeeID + "'," +
                            "'" + weekID + "','" + vacationOrNah + "')";
                    jdbcTemplate.execute(namesSql);

                } else {
                    continue;
                }
            }
            nrOfRows++;
        }
        System.out.println(nrOfRows + " has been inserted into vacation-table");

    }

    public void deleteTableData(String tableName, JdbcTemplate jdbcTemplate) {
        String truncate = "TRUNCATE TABLE " + tableName + " RESTART IDENTITY";
        jdbcTemplate.update(truncate);
    }

    public void resetAllTables(JdbcTemplate jdbcTemplate) {
        String truncate = "TRUNCATE TABLE vacation, weeks, employee, team RESTART IDENTITY";
        jdbcTemplate.update(truncate);

        System.out.println("Reset tables - done");
    }


}
