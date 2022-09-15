package WebScraper;

import com.example.vacationplanner.data.Alldata;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.DomNode;
import com.gargoylesoftware.htmlunit.html.DomNodeList;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.NTCredentials;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

import static org.jsoup.nodes.Document.OutputSettings.Syntax.html;

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

        for(int i = 0; i<64; i++){
            System.out.println( Jsoup.parse(page).select("tr").get(i).text());
        }



    }
}


