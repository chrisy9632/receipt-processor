up:
	docker build -t processor .
	docker run -p 3000:3000 --rm processor

down:
	docker stop $(docker ps -q --filter ancestor=processor)
