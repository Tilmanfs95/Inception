all:
		@docker-compose -f ./srcs/docker-compose.yml up -d

down:
		@docker-compose -f ./srcs/docker-compose.yml down

clean:
		@docker-compose -f ./srcs/docker-compose.yml down -v
		@docker image rm $$(docker images -a -q)

vclean:	
		rm -rf /home/tfriedri/data/*
		mkdir /home/tfriedri/data/db_files /home/tfriedri/data/wp_files /home/tfriedri/data/nginx_logs /home/tfriedri/data/goaccess_files
		@docker volume rm $$(docker volume ls -q)

fclean:
		@docker system prune -f --volumes

check:
		@echo "\033[32mContainers:\033[0m"
		@docker ps -a
		@echo "\033[32mImages:\033[0m"
		@docker image ls
		@echo "\033[32mVolumes:\033[0m"
		@docker volume ls
		@echo "\033[32mNetworks:\033[0m"
		@docker network ls

re:		clean all

.PHONY: all down re clean