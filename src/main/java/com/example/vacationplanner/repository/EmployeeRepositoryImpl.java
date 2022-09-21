package com.example.vacationplanner.repository;

import com.example.vacationplanner.VacationPlannerApplication;
import com.example.vacationplanner.model.Employee;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.jooq.SQL;
import org.jooq.impl.DSL;
import org.jooq.tools.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmployeeRepositoryImpl implements EmployeeRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List findByTeamId(String teamId) {
        String sql1 = "SELECT first_name,last_name,team_name FROM employee,team WHERE employee.team_id = team.id AND employee.team_id=" + teamId;

        List<Employee> employees = jdbcTemplate.query(
                sql1,
                new BeanPropertyRowMapper<>(Employee.class));
        return employees;
    }
    public List findByTeamId2(String teamId) throws SQLException {
        Connection con=DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/VPT","postgres","Apelsin22");

        String sql1 = "select first_name, last_name, team_name\n" +
                "FROM employee, team\n" +
                "WHERE employee.team_id = team.id\n" +
                "AND employee.team_id = " + teamId;


        List<String> result = new ArrayList<>();

        try (Statement stmt = con.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql1);
            while (rs.next()) {
                String firstName = rs.getString("FIRST_NAME");
                String lastName = rs.getString("LAST_NAME");
                String teamName = rs.getString("TEAM_NAME");
                result.add(firstName + lastName +" "+  teamName);
            }
        } catch (SQLException e) {
            System.out.println("oj det blev fel");
        }

        return result;
    }
}
