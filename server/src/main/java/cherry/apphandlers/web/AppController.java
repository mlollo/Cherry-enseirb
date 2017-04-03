package cherry.apphandlers.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cherry.apphandlers.service.Primitive;
import cherry.robothandlers.web.TestController;


@RestController
@RequestMapping("/app")
public class AppController {
private static Logger logger = Logger.getLogger(TestController.class);
	
	@CrossOrigin
	@RequestMapping("/prim-list")
	public static void appGetPrimitive(HttpServletRequest request, HttpServletResponse response) 
	{
			// Set response parameters
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");//cross domain request/CORS
		
			logger.info("\n Retrieve all poppy primitives.");
			// Send a JSON containing the robots
			try {
				response.getWriter().write(Primitive.getPrimitive());
				//mJSONArray.write(response.getWriter());
			} catch (IOException e) {
				System.out.println("\n Error: " + e);
			}
    }
}
