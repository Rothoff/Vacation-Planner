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

        String USERNAME = "erihol";
        String PASSWORD = "Apelsin22";
        /*
        Webscraper webscraper = new Webscraper();

        Document document = Jsoup.connect("https://www.imdb.com/chart/top/?ref_=nv_mv_250").get();
        Document document2 = Jsoup.connect("https://confluence.services.kambi.com/pages/viewpage.action?spaceKey=BOS&title=Vacation+Bet+Offer+Stream").get();
        System.out.println(webscraper.getDocument().select("tr").get(3).select("th").get(1).text());

        System.out.println(document2.select("tr").get(3).select("th").get(1).text());

        System.out.println(document.getElementsByClass("titleColumn").get(2).text());


         *///Create a new RedditClient and log us in!
        HTMLunitClient client = new HTMLunitClient("erihol", "Apelsin22");
        client.login();

        //Let's scrape our messages, information behind a login.
        //https://www.reddit.com/message/messages/ is the URL where messages are located.
        String page = client.get("https://confluence.services.kambi.com/display/BOS/Vacation+Bet+Offer+Stream");

        //"div.md" selects all divs with the class name "md", that's where message
        //bodies are stored. You'll find "<div class="md">" before each message.
        Elements messages = Jsoup.parse(page).select("div.md");




      /*  HashSet<String> uniqueTeams = new HashSet<>();
        for (int i = 2; i < 52; i++) {
            String team =Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(0).text();
            if (team.isEmpty()){
                continue;
            }
            uniqueTeams.add(team);
        }
        String[] teamss = uniqueTeams.toArray(new String[uniqueTeams.size()]);
        for (int i = 0; i < uniqueTeams.size(); i++) {

            System.out.println(teamss[i]);
        }

       /* String[] firstName = new String[52];
        String[] lastName = new String[52];
        for (int i = 2; i < 52; i++) {
            String fullname = Jsoup.parse(page).select("tr").get(i)
                    .select("th").get(1).text();
            firstName[i] = fullname.substring(0, fullname.indexOf(" ")+1);
            lastName[i] = fullname.substring(fullname.indexOf(" ") + 1);
            if (fullname.isEmpty()){
                continue;
            }
            System.out.println(lastName);
        }*/

       /* int[] weekNumber = new int[21];
        for (int i = 0; i < 21; i++) {
           String weeks = Jsoup.parse(page).select("tr").get(0)
                    .select("td").get(i).text();
           String number = weeks.substring(weeks.indexOf(" ") +1);
           weekNumber[i] = Integer.parseInt(number);

            System.out.println(weekNumber[i]);

        } */



    }
}


