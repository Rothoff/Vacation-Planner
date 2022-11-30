package com.example.vacationplanner.database;

import org.jsoup.Jsoup;
import org.springframework.jdbc.core.JdbcTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.Calendar;
import java.util.Date;
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

    int year = Year.now().getValue();

    public long numberOfColumns(String page){
        long nrOfColumns = Jsoup.parse(page).select("tbody").get(0)
                .select("tr").get(0)
                .select("td").spliterator().getExactSizeIfKnown();
        return nrOfColumns;
    }

    public long numberOfRows(String page){
        long nrOfRows = Jsoup.parse(page)
                .select("tbody").get(0)
                .select("tr").spliterator().getExactSizeIfKnown();
        return nrOfRows;
    }

   public long numberOfTbodys (String page){
       long nrOfTbodys = Jsoup.parse(page)
               .select("tbody").spliterator().getExactSizeIfKnown();
       return nrOfTbodys;
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

    public void weekDataToDatabase(JdbcTemplate jdbcTemplate, String page, long numberOfColumns) throws ParseException {
        for (int i = 0; i < numberOfColumns; i++) {

            weeks = Jsoup.parse(page).select("tbody").get(0).select("tr").get(0)
                    .select("td").get(i).text();
            String[] dates = Jsoup.parse(page).select("tbody").get(0).select("tr").get(1)
                    .select("td").get(i).text().split("-");

            System.out.println("WEEKS" + weeks);

            Date todaysDate = new Date();
            Date startDate = new SimpleDateFormat("dd/MM/yyyy").parse(dates[0].trim()+"/"+year);
            Date endDate = new SimpleDateFormat("dd/MM/yyyy").parse(dates[1].trim()+"/"+year);

            Calendar cal = Calendar.getInstance();
            cal.setTime(startDate);
            int monthStartDate = cal.get(Calendar.MONTH)+1;
            cal.setTime(endDate);
            int monthEndDate = cal.get(Calendar.MONTH)+1;
            cal.setTime(todaysDate);
            int monthCurrentDate = cal.get(Calendar.MONTH)+1;



            if (cal.get(Calendar.MONTH) == 0 || cal.get(Calendar.MONTH) == 1 || cal.get(Calendar.MONTH) == 2){
                cal.add(Calendar.YEAR, -1);
                year = cal.get(Calendar.YEAR);
            }

            System.out.println(todaysDate);
            if (monthEndDate < monthCurrentDate && monthStartDate >= monthCurrentDate){
                endDate = new SimpleDateFormat("dd/MM/yyyy").parse(dates[1].trim()+"/"+(year+1));
            }else if (monthEndDate < monthCurrentDate){
                startDate = new SimpleDateFormat("dd/MM/yyyy").parse(dates[0].trim()+"/"+(year+1));
                endDate = new SimpleDateFormat("dd/MM/yyyy").parse(dates[1].trim()+"/"+(year+1));
            }

            numberString = weeks.substring(weeks.indexOf(" ") + 1);
            weekNumber = Integer.parseInt(numberString);


            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String startDateFormat = simpleDateFormat.format(startDate);
            String endDateFormat = simpleDateFormat.format(endDate);

            System.out.println("Insert INTO week (week_number) VALUES ('" +weekNumber);

            String sqlString = "Insert INTO week (week_number,start_date, end_date) VALUES ('" + weekNumber + "'," +
                    "'" + startDateFormat + "','" + endDateFormat + "')";
            jdbcTemplate.update(sqlString);

            int year = Year.now().getValue();
        }
        System.out.println("rows has been inserted into week-table");
    }

    public void vacationDataToDataBase(JdbcTemplate jdbcTemplate, String page, long numberOfColumns, long numberOfRows) {
        for (int row = 2; row < numberOfRows; row++) {
            String fullName = Jsoup.parse(page).select("tbody").get(0).select("tr").get(row)
                    .select("th").get(1).text();

            firstName = fullName.substring(0, fullName.indexOf(" ") + 1);
            lastName = fullName.substring(fullName.indexOf(" ") + 1);

            for (int column = 0; column < numberOfColumns; column++) {
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
