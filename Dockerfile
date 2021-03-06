FROM mariadb
COPY ./setup.sql /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/setup.sql
ENV MYSQL_ROOT_PASSWORD=safepass
CMD ["mysqld"]
