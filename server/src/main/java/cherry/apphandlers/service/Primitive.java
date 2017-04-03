package cherry.apphandlers.service;
import org.apache.log4j.Logger;
import cherry.robothandlers.service.HttpConnection;
import cherry.robothandlers.service.LaunchPrimitive;
import cherry.robothandlers.web.SetupController;

public class Primitive {
	private static Logger logger = Logger.getLogger(LaunchPrimitive.class);

	// Method to get all primitives
	public static String getPrimitive(){
		try {
			logger.info("Get All Primitives From Poppy");
			return HttpConnection.sendGet(SetupController.urlToRobot + "/primitive/list.json");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}


	