package com.example.vacationplanner.Database;

import org.jsoup.Jsoup;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.HashSet;
public class DataToDatabase {

    public void collectAllData(){

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
        String[] firstName = new String[52];
        String[] lastName = new String[52];
        String[] teamName = new String[52];
        for (int i = 2; i < 52; i++) {
            teamName[i] = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(0).text();
            String fullname = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(1).text();
            firstName[i] = fullname.substring(0, fullname.indexOf(" ") + 1);
            lastName[i] = fullname.substring(fullname.indexOf(" ") + 1);
            if (fullname.isEmpty()) {
                continue;
            }
            String resultID = jdbcTemplate.queryForObject("SELECT id FROM team WHERE team_name = '" + teamName[i] + "'"
                    , String.class);
            String namesSql = "Insert INTO employee (first_name, last_name, team_id) VALUES ('" + firstName[i] + "'," +
                    "'" + lastName[i] + "','" + resultID + "')";
            jdbcTemplate.execute(namesSql);
        }
        System.out.println(firstName.length + " rows has been inserted into employee-table");
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

    public void deleteTableData (String tableName, JdbcTemplate jdbcTemplate){
        String truncate = "TRUNCATE TABLE " + tableName + " RESTART IDENTITY";
        jdbcTemplate.update(truncate);
    }
    public void resetAllTables(JdbcTemplate jdbcTemplate){
        String truncate = "TRUNCATE TABLE vacation, weeks, employee, team RESTART IDENTITY";
        jdbcTemplate.update(truncate);

        System.out.println("Reset tables - done");
    }


}
