package WebScraper;

import com.example.vacationplanner.data.Alldata;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class TestingWs {

    public static void main(String[] args) throws NoSuchAlgorithmException, IOException, KeyManagementException {

        /*
        Webscraper webscraper = new Webscraper();

        Document document = Jsoup.connect("https://www.imdb.com/chart/top/?ref_=nv_mv_250").get();
        Document document2 = Jsoup.connect("https://confluence.services.kambi.com/pages/viewpage.action?spaceKey=BOS&title=Vacation+Bet+Offer+Stream").get();
        System.out.println(webscraper.getDocument().select("tr").get(3).select("th").get(1).text());

        System.out.println(document2.select("tr").get(3).select("th").get(1).text());

        System.out.println(document.getElementsByClass("titleColumn").get(2).text());


         */
        Alldata alldata = new Alldata();
        for (String s : alldata.data()){
            System.out.println(s);
        }

    }
}
