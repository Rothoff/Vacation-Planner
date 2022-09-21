package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Team;
import com.example.vacationplanner.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamController {

    @Autowired
    private TeamRepository teamRepo;

    @GetMapping("/teams")
    public List<Team> listAll(Model model) {
        List<Team> listTeam = teamRepo.findAll();
        model.addAttribute("listTeams", listTeam);
        return listTeam;

    }
    @GetMapping("/teams2")
    public String ttt(Model model) {
        String teamString = teamRepo.getReferenceById(3).getTeam_name();
        return teamString;
    }
    @GetMapping("/team3")
    public List<Team> getTeamNames(@RequestParam String name) {
        List<Team> teamList = teamRepo.findAll();
        return teamList;
    }


}
