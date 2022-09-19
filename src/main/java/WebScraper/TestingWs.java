package WebScraper;

import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class TestingWs {

    public static void main(String[] args) throws NoSuchAlgorithmException, IOException, KeyManagementException, InterruptedException {

        JdbcTemplate jdbcTemplate = new JdbcTemplate();

        String USERNAME = "erihol";
        String PASSWORD = "Apelsin22";


        HTMLunitClient client = new HTMLunitClient("erihol", "Apelsin22");
        client.login();
        String page = client.get("https://confluence.services.kambi.com/display/BOS/Vacation+Bet+Offer+Stream");
        Elements messages = Jsoup.parse(page).select("div.md");


    }
}



