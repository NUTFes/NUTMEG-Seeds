FROM hasura/graphql-engine:latest
WORKDIR /hasura
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
