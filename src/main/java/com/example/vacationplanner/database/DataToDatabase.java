package com.example.vacationplanner.database;

import com.example.vacationplanner.repository.WeekRepository;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
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

    public long numberOfColumns(String page){
        long nrOfColumns = Jsoup.parse(page).select("tbody").get(1)
                .select("tr").get(0)
                .select("th").spliterator().estimateSize();
        return nrOfColumns;
    }

    public long numberOfRows(String page){
        long nrOfRows = Jsoup.parse(page)
                .select("tbody").get(1)
                .select("tr").spliterator().estimateSize();
        return nrOfRows;
    }

   public long numberOfTbodys (String page){
       long nrOfRows = Jsoup.parse(page)
               .select("tbody").spliterator().estimateSize();

       return nrOfRows;
   }


    public void teamDataToDatabase(JdbcTemplate jdbcTemplate, String page, long numberOfRows) {
        HashSet<String> uniqueTeams = new HashSet<>();
        for (int i = 2; i < numberOfRows; i++) {
            teamName = Jsoup.parse(page).select("tbody").get(0).select("tr").get(i)
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

    public void employeeDataToDatabase(JdbcTemplate jdbcTemplate, String page, long numberOfRows) {
        int nrOfRows = 0;
        for (int i = 2; i < numberOfRows; i++) {
            teamName = Jsoup.parse(page).select("tbody").get(0).select("tr").get(i)
                    .select("th").get(0).text();
            fullname = Jsoup.parse(page).select("tbody").get(0).select("tr").get(i)
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

    public void weekDataToDatabase(JdbcTemplate jdbcTemplate, String page, long numberOfColumns) {
        for (int i = 2; i < numberOfColumns; i++) {
            weeks = Jsoup.parse(page).select("tbody").get(0).select("tr").get(0)
                    .select("td").get(i).text();
            numberString = weeks.substring(weeks.indexOf(" ") + 1);
            weekNumber = Integer.parseInt(numberString);

            System.out.println("Insert INTO week (week_number) VALUES ('" +weekNumber);

            String namesSql = "Insert INTO week (week_number) VALUES ('" + weekNumber + "')";
            jdbcTemplate.update(namesSql);
        }
        System.out.println("rows has been inserted into week-table");
    }

    public void vacationDataToDataBase(JdbcTemplate jdbcTemplate, String page, long numberOfColumns, long numberOfRows) {
        for (int row = 2; row < numberOfRows; row++) {
            String fullName = Jsoup.parse(page).select("tbody").get(0).select("tr").get(row)
                    .select("th").get(1).text();

            firstName = fullName.substring(0, fullName.indexOf(" ") + 1);
            lastName = fullName.substring(fullName.indexOf(" ") + 1);

            for (int column = 2; column < numberOfColumns; column++) {
                tdText = Jsoup.parse(page).select("tbody").get(0).select("tr").get(row)
                        .select("td").get(column).text();
                weeks = Jsoup.parse(page).select("tbody").get(0).select("tr").get(0)
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
