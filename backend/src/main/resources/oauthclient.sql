

  CREATE TABLE public.oauth_client_details
(
  client_id character varying(255) NOT NULL,
  resource_ids character varying(255),
  client_secret character varying(255),
  scope character varying(255),
  authorized_grant_types character varying(255),
  web_server_redirect_uri character varying(255),
  authorities character varying(255),
  access_token_validity integer,
  refresh_token_validity integer,
  additional_information character varying(4096),
  autoapprove character varying(255),
  CONSTRAINT oauth_client_details_pkey PRIMARY KEY (client_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.oauth_client_details
  OWNER TO postgres;

INSERT INTO "oauth_client_details" ("client_id", "resource_ids", "client_secret", "scope", "authorized_grant_types", "web_server_redirect_uri", "authorities", "access_token_validity", "refresh_token_validity", "additional_information", "autoapprove") VALUES
	(E'web', E'web-service', E'pass', E'read, write', E'refresh_token,client_credentials,password', NULL, E'dashboard', 30000, 3000000, NULL, NULL);

	
	