package cherry.robothandlers.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import cherry.gamehandlers.web.JsonRetriever;
import cherry.robothandlers.service.LaunchPresentation;
import cherry.robothandlers.service.LaunchPrimitive;
import cherry.robothandlers.service.Poppy;
import cherry.robothandlers.service.Robot;


@RestController
@RequestMapping("/test")
public class TestController {
    
	private static Logger logger = Logger.getLogger(TestController.class);
	
	/*@CrossOrigin
	@RequestMapping("/behave")
	public Poppy testBehave(@RequestParam(value="name") String behaveStr) 
	{
			String info = "\n I played the following behave: " + behaveStr;
			
			if(!LaunchPresentation.isPresentationRunning)
			{
				logger.info("Play behavior :" + behaveStr);
				LaunchPrimitive.startBehaviorPrimitive(behaveStr);
			}
			else {
				logger.warn("A presentation is running. Please retry later");
			}
		    return new Poppy(info);  
    }*/
	
	
	@CrossOrigin
	@RequestMapping("/behave")
	public Poppy testBehave(@RequestParam(value="name") String behaveStr,@RequestParam(value="id", required = false, defaultValue = "null") String name) 
	{
			String info = "\n I played the following behave: " + behaveStr;
			Iterator<Robot> robotIdx = SetupController.robotList.iterator();
			Robot robot = new Robot();
			if(name.equals("null"))
				robot = robotIdx.next();
			else{
				while (robotIdx.hasNext()) {
	        	    Robot currentRobot = robotIdx.next();
	        	    if(currentRobot.getName().equals(name)){
	        	    	robot = currentRobot;
	        	    	break;
	        	    }
	        	}
			}
			if(!LaunchPresentation.isPresentationRunning)
			{
				logger.info("Play behavior :" + behaveStr);
				LaunchPrimitive.startBehaviorPrimitive(behaveStr,robot.getIp());
			}
			else {
				logger.warn("A presentation is running. Please retry later");
			}
		    return new Poppy(info);  
    }
	
	/**
	 * @param name
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value = "/primitives.json", method = RequestMethod.GET, produces = "application/json")
	public void testPrimitives(@RequestParam(value="id", required = false, defaultValue = "null") String name, HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException
	{
			String info = new String();
			Iterator<Robot> robotIdx = SetupController.robotList.iterator();
			Robot robot = new Robot();
			if(name.equals("null"))
				robot = robotIdx.next();
			else{
				while (robotIdx.hasNext()) {
	        	    Robot currentRobot = robotIdx.next();
	        	    if(currentRobot.getName().equals(name)){
	        	    	robot = currentRobot;
	        	    	break;
	        	    }
	        	}
			}
			
			if(!robot.getName().equals("null")){
				logger.info("Get all primitives");
				info = LaunchPrimitive.getPrimitiveList(robot.getIp());
			}else{
				info = "There is no robot available.";
			}
			res.setContentType(MediaType.APPLICATION_JSON);
			PrintWriter out = res.getWriter();
			out.write(info);
    }
		

	@CrossOrigin
	@RequestMapping("/speak")
	public Poppy testSpeak(@RequestParam (value="text", required = true) String textStr, @RequestParam (value="tts_engine", required = false, defaultValue = "null")String ttsName) 
	{
			String info = "\n I said " + textStr;
			
			if(!LaunchPresentation.isPresentationRunning)
			{
				if( ttsName != null)
				{
					LaunchPrimitive.setPrimitiveParameter("speak", "tts_engine", ttsName);
				}
				
				logger.info("Play behavior :" + textStr);
				LaunchPrimitive.startSpeakPrimitive(textStr);
			
			}
			else {
				logger.warn("A presentation is running. Please retry later");
			}
		    return new Poppy(info);  
    }

	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, value = "/{json}")
	public Poppy jsonReader(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		StringBuffer jb = new StringBuffer();
		String line = null;
		String info = new String();
		info = "Json";
		try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      jb.append(line);
		  } catch (Exception e) { 
			  logger.error("Can't read the request", e);
			  info  = "Can't read request";
		  }
		  
		  
		  //JSONObject myJson = new JSONObject();
			
		    // Check if a proper Json
		    //try{
			    //myJson = new JSONObject((jb.toString()));
		    //}
		    //catch(Exception e){
		    	//logger.error("It's not a JSON", e);
				//info  = "Not a Json";
				//return new Poppy(info);
			//}
		  
		    //LaunchPrimitive.sendMovementToRobot(myJson.toString());
		    //LaunchPrimitive.playMovement();
		  
		return new Poppy(info); 
	}
	
}