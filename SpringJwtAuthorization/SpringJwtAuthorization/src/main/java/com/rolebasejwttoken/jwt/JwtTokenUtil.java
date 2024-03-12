

package com.rolebasejwttoken.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtTokenUtil {

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    private final String secret = "your-secret-key";

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        claims.put("roles", roles);

        return doGenerateToken(claims, userDetails.getUsername());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
































//package com.rolebasejwttoken.jwt;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.function.Function;
//import java.util.stream.Collectors;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import com.rolebasejwttoken.model.CustomUserDetails;
//
//import io.jsonwebtoken.Claims;
//
//import io.jsonwebtoken.Jwts;
//
//import io.jsonwebtoken.SignatureAlgorithm;
//
//@Component
//public class JwtTokenUtil {
//
//	// requirement :
//	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
//
//	// public static final long JWT_TOKEN_VALIDITY = 60;
//	private String secret = "afafasfafafasfasfasfafacasdasfasxASFACASDFACASDFASFASFDAFASFASDAADSCSDFADCVSGCFVADXCcadwavfsfarvf";
//
//	// retrieve username from jwt token
//	public String getUsernameFromToken(String token) {
//		return getClaimFromToken(token, Claims::getSubject);
//	}
//
//	// retrieve expiration date from jwt token
//	public Date getExpirationDateFromToken(String token) {
//		return getClaimFromToken(token, Claims::getExpiration);
//	}
//
//	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
//		
//		
//		
//	    final Claims claims = getAllClaimsFromToken(token);
//	    return claimsResolver.apply(claims);
//	}
//
//
//	// for retrieveing any information from token we will need the secret key
//	public Claims getAllClaimsFromToken(String token) {
//
//		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
////    	return Jwts.parser().setSigningKey(secret).parse(token);
////    	return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
//	}
//
//	// check if the token has expired
//	private Boolean isTokenExpired(String token) {
//		final Date expiration = getExpirationDateFromToken(token);
//		return expiration.before(new Date());
//	}
//
//	private String doGenerateToken(Map<String, Object> claims, String subject) {
//		return Jwts.builder()
//
//				.setClaims(claims).setSubject(subject).setIssuer("your-issuer-name")
//				.setIssuedAt(new Date(System.currentTimeMillis()))
//				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
////                .signWith(SignatureAlgorithm.HS512, secret.getBytes())
//				.signWith(SignatureAlgorithm.HS512, secret.getBytes())
////                .signWith(SignatureAlgorithm, signingKey)
//				.compact();
//	}
//
//	public String generateToken(UserDetails userDetails) {
//		Map<String, Object> claims = new HashMap<>();
//
//		if (userDetails instanceof CustomUserDetails) {
//			CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
//			List<String> roles = customUserDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
//					.collect(Collectors.toList());
//			claims.put("roles", roles);
//		}
//
//		return doGenerateToken(claims, userDetails.getUsername());
//	}
//
//	// validate token
//	public Boolean validateToken(String token, UserDetails userDetails) {
//		final String username = getUsernameFromToken(token);
//		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//	}
//}
//
//// generate token for user
////public String generateToken(UserDetails userDetails) {
////  Map<String, Object> claims = new HashMap<>();
////  return doGenerateToken(claims, userDetails.getUsername());
////}
////
////
//
//// while creating the token -
//// 1. Define claims of the token, like Issuer, Expiration, Subject, and the ID
//// 2. Sign the JWT using the HS512 algorithm and secret key.
//// 3. According to JWS Compact
//// Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
//// compaction of the JWT to a URL-safe string
////private String doGenerateToken(Map<String, Object> claims, String subject) {
////  return Jwts.builder()
////          .setClaims(claims)
////          .setSubject(subject)
////          .setIssuedAt(new Date(System.currentTimeMillis()))
////          .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
////          .signWith(SignatureAlgorithm.HS512, secret.getBytes())
////          .compact();
////}
//
////public String generateToken(UserDetails userDetails) {
////Map<String, Object> claims = new HashMap<>();
////
////// Extract roles from userDetails and add them to claims
////if (userDetails instanceof CustomUserDetails) {
////  CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
////  List<String> roles = customUserDetails.getAuthorities().stream()
////          .map(GrantedAuthority::getAuthority)
////          .collect(Collectors.toList());
////  claims.put("roles", roles);
////}
////
////String token = doGenerateToken(claims, userDetails.getUsername());
////System.out.println("Generated Token: " + token);
////
////// Decode and print claims for debugging
////Claims decodedClaims = Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody();
////System.out.println("Decoded Claims: " + decodedClaims);
////
////return token;
////}
////
////
//
////
////private String doGenerateToken(UserDetails userDetails) {
////Map<String, Object> claims = new HashMap<>();
////Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
////
////// Extract roles from authorities and add them to claims
////List<String> roles = authorities.stream()
////      .map(GrantedAuthority::getAuthority)
////      .collect(Collectors.toList());
////claims.put("roles", roles);
////
////return Jwts.builder()
////      .setClaims(claims)
////      .setSubject(userDetails.getUsername())
////      .setIssuedAt(new Date(System.currentTimeMillis()))
////      .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
////      .signWith(SignatureAlgorithm.HS512, secret.getBytes())
////      .compact();
////}
////
////
