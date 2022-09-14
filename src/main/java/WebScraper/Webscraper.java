package WebScraper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class Webscraper {
    TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            return null;
        }
        public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {
        }

        public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {
        }
    } };

    public Document getDocument () throws NoSuchAlgorithmException, KeyManagementException, IOException {
        String url = "https://confluence.services.kambi.com/pages/viewpage.action?spaceKey=BOS&title=Vacation+Bet+Offer+Stream";
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        Document doc = Jsoup.connect(url)
                .sslSocketFactory(sc.getSocketFactory())
                .get();
        return doc;
    }

}
