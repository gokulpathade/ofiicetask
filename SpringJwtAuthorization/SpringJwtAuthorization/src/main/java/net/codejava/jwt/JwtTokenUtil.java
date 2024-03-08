package net.codejava.jwt;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import net.codejava.model.Role;
import net.codejava.model.User;

@Component
public class JwtTokenUtil {
	
	
	  private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);

	    private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

	    @Value("${app.jwt.secret}")
	    private String SECRET_KEY;

	    public String generateAccessToken(User user) {
	        return Jwts.builder()
	                .setSubject(String.format("%s,%s", user.getId(), user.getEmail()))
	                .setIssuer("rolebaseauth")
	                .claim("roles", user.getRoles()) // Set user roles
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
	                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
	                .compact();
	    }

//	    public boolean validateAccessToken(String token) {
//	        try {
//	            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
//	            return true;
//	        } catch (Exception ex) {
//	            LOGGER.error("JWT validation failed", ex);
//	            return false;
//	        }
//	    }

	    
//	    
//	    
//	    public boolean validateAccessToken(String token) {
//	        try {
//	            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
//
//	            // Extract roles from the token claims
//	            String roles = claims.get("roles", String.class);
//
//	            // Process the roles as needed (e.g., convert to a Set<GrantedAuthority>)
//
//	            // Perform additional validation if required
//
//	            return true;
//	        } catch (Exception ex) {
//	            LOGGER.error("JWT validation failed", ex);
//	            return false;
//	        }
//	    }
	    
	    
	    
	    
	    

	    public boolean validateAccessToken(String token) {
	        try {
	            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
	            validateRoles(claims); // Validate and process roles

	            // Perform additional validation if required

	            return true;
	        } catch (Exception ex) {
	            LOGGER.error("JWT validation failed", ex);
	            return false;
	        }
	    }

	    private void validateRoles(Claims claims) {
	        Object rolesObj = claims.get("roles");
	        if (rolesObj instanceof List<?>) {
	            List<?> rolesList = (List<?>) rolesObj;
	            // Process rolesList as needed
	        } else {
	            LOGGER.warn("Roles claim in JWT is not a list");
	            // Handle the case where roles claim is not a list
	        }
	    }
	    
	    
	    
	    
	    public Set<String> getRoles(String token) {
	        Claims claims = parseClaims(token);
	        return (Set<String>) claims.get("roles");
	    }

	    Claims parseClaims(String token) {
	        return Jwts.parser()
	                .setSigningKey(SECRET_KEY)
	                .parseClaimsJws(token)
	                .getBody();
	    }
}