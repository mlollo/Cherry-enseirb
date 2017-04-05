package cherry.apphandlers.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cherry.robothandlers.service.LaunchPresentation;
import cherry.robothandlers.service.LaunchPrimitive;
import cherry.robothandlers.service.Poppy;
import cherry.robothandlers.service.Robot;
import cherry.robothandlers.web.SetupController;
import cherry.robothandlers.web.TestController;

@RestController
@RequestMapping("/app")
public class AppController {
private static Logger logger = Logger.getLogger(TestController.class);
	
	@CrossOrigin
	@RequestMapping(value = "/primitives.json", method = RequestMethod.GET, produces = "application/json")
	public void appPrimitives(@RequestParam(value="id", required = false, defaultValue = "null") String name, HttpServletRequest req, HttpServletResponse res)
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
	@RequestMapping("/behave")
	public Poppy appBehave(@RequestParam(value="name") String behaveStr,@RequestParam(value="id", required = false, defaultValue = "null") String name) 
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
			if(!LaunchPresentation.isPresentationRunning && !robot.getIsMoving())
			{
				logger.info("Play behavior :" + behaveStr);
				robot.setIsMoving(true);
				LaunchPrimitive.startBehaviorPrimitive(behaveStr,robot.getIp());
			}
			else {
				logger.warn("A presentation or a behave is running. Please retry later");
			}
		    return new Poppy(info);  
    }
	
	@CrossOrigin
	@RequestMapping(value = "/chore", method = RequestMethod.POST)
	public Poppy appChore(@RequestParam(value="list") JSONObject jsonPrim,@RequestParam(value="id", required = false, defaultValue = "null") String name) 
	{
			String info = "\n I a set of behave. ";
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
			if(!LaunchPresentation.isPresentationRunning && !robot.getIsMoving())
			{
				@SuppressWarnings("unchecked")
				List<String> primList = (List<String>) jsonPrim.get("primitive");
				robot.setPrimList(primList);
				logger.info("Begin of chore with a set of " + primList.size() + " primitives.");
				Iterator<String> primIt = robot.getPrimList().iterator();
				if(primIt.hasNext()){
					String primitive = primIt.next();
					logger.info("Play behavior :" + primitive);
					robot.setIsMoving(true);
					LaunchPrimitive.startBehaviorPrimitive(primitive,robot.getIp());
				}else{
					robot.setIsMoving(false);
					logger.info("List of primitives is empty.");
				}
			}
			else {
				logger.warn("A presentation or a behave is running. Please retry later");
			}
		    return new Poppy(info);  
    }
	
	
	@CrossOrigin
	@RequestMapping(value = "/{id}/ismoving", method = RequestMethod.GET)
	public void appChore(@PathParam("id") String name, HttpServletRequest req, HttpServletResponse res)
	        throws ServletException, IOException 
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
			JSONObject json = new JSONObject();
			if(!LaunchPresentation.isPresentationRunning && !robot.getIsMoving())
			{
				json.append("isMoving", false);
			}
			else {
				logger.warn("A presentation or a behave is running. Please retry later");
				json.append("isMoving", true);
			}
			res.setContentType(MediaType.APPLICATION_JSON);
			PrintWriter out = res.getWriter();
			out.write(json.toString());  
    }
	/*@CrossOrigin
	@RequestMapping("/add/user")
	public String appAddUser(
			@RequestParam(value="type") String type,
			@RequestParam(value="email") String email,
			@RequestParam(value="pw") String pw,
			@RequestParam(value="last") String last,
			@RequestParam(value="first") String first) 
	{
		 	ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("file:spring-conf.xml");
		    UserCollection userCollection = context.getBean(UserCollection.class);

		    Iterable<User> userList = userCollection.findAll();
			Long id = null;
            for (User u : userList){
	                id = u.getUserId();
	        }
		    User user = null;
		    if(type.equals("child")){
				user = new Child(id+1,email,pw,last,first);
		    }else if(type.equals("doctor")){
				user = new Doctor(id+1,email,pw,last,first);
		    }else if(type.equals("family")){
				user = new Family(id+1,email,pw,last,first);
		    }else if(type.equals("teacher")){
				user = new Teacher(id+1,email,pw,last,first);
		    }else{
		    	context.close();
		    	return "Please enter a valid user : \n /user?type=<<child,doctor,family,teacher>>&email=<>&pw=<>&last=<>&first=<>";
		    }
			
			userCollection.save(user);
			
		    Iterable<User> userlist = userCollection.findAll();
	        System.out.println("Person List : ");
            for (User u : userlist){
	                System.out.println(u);
	        }
            //System.out.println("User Record with name jon is "+ userCollection.searchByLastName("jon"));
            context.close();

		    return user.toString();  
    }
	
	@CrossOrigin
	@RequestMapping("/get/user")
	public String appGetUser() 
	{
		 	ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("file:spring-conf.xml");
		    UserCollection userCollection = context.getBean(UserCollection.class);
						
			Iterable<User> userList = userCollection.findAll();
			String out = "Users List :<br>\n";
            for (User u : userList){
	                out = out + u + "<br>\n";
	        }
            context.close();
            System.out.println(out);
		    return out;  
    }
	
	@CrossOrigin
	@RequestMapping("/get/robot")
	public String appGetRobot() 
	{
		 	ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("file:spring-conf.xml");
		    RobotCollection robotCollection = context.getBean(RobotCollection.class);
					
			Iterable<Robot> robotList = robotCollection.findAll();
			String out = "robot List :<br>\n";
            for (Robot u : robotList){
	                out = out + u + "<br>\n";
	        }
            context.close();
            System.out.println(out);
		    return out;  
    }*/
	
}
