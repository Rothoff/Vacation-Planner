package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Team;
import com.example.vacationplanner.repository.TeamRepository;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    @Autowired
    private TeamRepository teamRepo;

    @GetMapping("/teams")
    public String listAll(Model model) {
        List<Team> listTeam = teamRepo.findAll();
        model.addAttribute("listTeams", listTeam);

        String json = new Gson().toJson(listTeam);
        return json;

    }
}
