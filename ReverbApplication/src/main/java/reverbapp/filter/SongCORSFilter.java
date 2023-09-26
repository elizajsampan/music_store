package reverbapp.filter;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

@Provider
public class SongCORSFilter implements ContainerResponseFilter{

	@Override
	public void filter(ContainerRequestContext reqContext, ContainerResponseContext respContext) throws IOException {
		respContext.getHeaders().add("Access-Control-Allow-Origin", "*");
		respContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
		respContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, x-requested-with, accept, authorization");
		respContext.getHeaders().add("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE, PATCH");
	}
}
