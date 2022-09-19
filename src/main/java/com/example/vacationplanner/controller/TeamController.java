package com.example.vacationplanner.controller;

import com.example.vacationplanner.Model.Team;
import com.example.vacationplanner.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class TeamController {

    @Autowired
    private TeamRepository teamRepo;

    @GetMapping("/teams")
    public String listAll(Model model) {
        List<Team> listTeam = teamRepo.findAll();
        model.addAttribute("listTeams", listTeam);
        return "Teams";
    }


}
