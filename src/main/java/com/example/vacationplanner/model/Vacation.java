package com.example.vacationplanner.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "vacation")
public class Vacation{

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "week_id")
    private Week week;

    private String text;

}
