package cherry.robothandlers.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

//@Document(collection="robot")
public class Robot {
	@Id
	private String name;
	private String ip;
	private boolean isSpeaking;
	private boolean isMoving;
	private List<String> primList;

	//@PersistenceConstructor
	public Robot(){
		name = "no_name";
		ip ="0";
		isSpeaking = false;
		isMoving = false;
		setPrimList(new ArrayList<String>());
	}
	
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = "http://" + ip + ":8000";
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public boolean getIsSpeaking() {
		return isSpeaking;
	}

	public void setIsSpeaking(boolean isSpeaking) {
		this.isSpeaking = isSpeaking;
	}

	public boolean getIsMoving() {
		return isMoving;
	}

	public void setIsMoving(boolean isMoving) {
		this.isMoving = isMoving;
	}

	public List<String> getPrimList() {
		return primList;
	}

	public void setPrimList(List<String> primList) {
		this.primList = primList;
	}  


	
	@Override
    public String toString()
	{
            return "Robot [name = " + this.getName() + ", ip = " + this.getIp() + "]";
    }
}
