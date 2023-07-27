FROM ubuntu/squid
COPY squid.conf /etc/squid/squid.conf
EXPOSE 3128
