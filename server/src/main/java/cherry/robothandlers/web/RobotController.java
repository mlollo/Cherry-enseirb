package cherry.robothandlers.web;

import java.util.Iterator;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cherry.robothandlers.service.LaunchPrimitive;
import cherry.robothandlers.service.Robot;

@RestController
@RequestMapping("/robot")
public class RobotController {
	private static Logger logger = Logger.getLogger(TestController.class);

	@CrossOrigin
	@RequestMapping(value = "/speakfinished", method = RequestMethod.POST)
	public void speakFinished(@RequestParam(value="id", required = false, defaultValue = "null") String name)
	{	
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
			logger.info("Robot finished behave.");
			Iterator<String> speechIt = robot.getSpeechList().iterator();
			if(speechIt.hasNext()){
				String speech = speechIt.next();
				robot.setIsSpeaking(true);
				LaunchPrimitive.startSpeakPrimitive(speech,robot.getIp());
				logger.info("I speak the following text : " + speech);
				speechIt.remove();
			}else{
				robot.setIsSpeaking(false);
				logger.info("End of the set of phrases.");
			}
		}
	}

	@CrossOrigin
	@RequestMapping(value = "/behavefinished", method = RequestMethod.POST)
	public void behaveFinished(@RequestParam(value="id", required = false, defaultValue = "null") String name)
	{
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
				logger.info("Robot finished behave.");
				Iterator<String> primIt = robot.getPrimList().iterator();
				if(primIt.hasNext()){
					String primitive = primIt.next();
					robot.setIsMoving(true);
					LaunchPrimitive.startBehaviorPrimitive(primitive,robot.getIp());
					logger.info("I played the following behave : " + primitive);
					primIt.remove();
				}else{
					robot.setIsMoving(false);
					logger.info("End of the set of primitives.");
				}
			}
	}
}
