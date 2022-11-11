package webScraper;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlForm;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.io.IOException;
import java.net.MalformedURLException;

public class HTMLunitClient {

    //Create a new WebClient
    WebClient WEB_CLIENT = new WebClient(BrowserVersion.CHROME);

    //webClient.getOptions().setCssEnabled(true);

    //Credentials
    private final String username;
    private final String password;

    //Constructor. Sets username and password and does some client config.
    public HTMLunitClient(String username, String password) {
        this.username = username;
        this.password = password;

        //enables cookies.
        WEB_CLIENT.getCookieManager().setCookiesEnabled(true);
    }

    public void login() {

        String loginURL = "https://confluence.services.kambi.com/login.action?logout=true";
        try {
            //Create an HtmlPage and get the login page.
            WEB_CLIENT.getOptions().setUseInsecureSSL(true);

            WEB_CLIENT.getOptions().setThrowExceptionOnScriptError(false);
            WEB_CLIENT.getOptions().setThrowExceptionOnFailingStatusCode(false);

            //Create an HtmlForm by locating the form that pertains to logging in.
            //"//form[@id='login-form']" means "look for a <form> tag with the
            //id attribute 'login-form'"
            //<form id="login-form" method="post" ...
            HtmlPage loginPage = WEB_CLIENT.getPage(loginURL);
            HtmlForm loginForm = loginPage.getFormByName("loginform");

            // "Find the <input> tags with the names "user" and "passwd"
            //and throw in our username and password in the text fields.
            loginForm.getInputByName("os_username").setValueAttribute(username);
            loginForm.getInputByName("os_password").setValueAttribute(password);

            loginForm.getInputByName("login").click();
            //loginForm.getElementsByTagName("button").get(0).click();

        } catch (FailingHttpStatusCodeException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String get(String URL) {
        try {
            //All this method returns the HTML response for some URL.
            return WEB_CLIENT.getPage(URL).getWebResponse().getContentAsString();
        } catch (FailingHttpStatusCodeException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}


