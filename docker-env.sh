#!/bin/bash

show_menu() {
  clear
  echo " Escolha uma opção"
  echo "===================="
  echo "1 - Desenvolvimento (Dev)"
  echo "2 - Produção (Prod)"
  echo "3 - Sair"
}

run_dev() {
  echo "Iniciando o container em modo dev..."
  docker-compose down
  docker-compose up -d app-dev --build
  echo ""
  echo "Backend: http://localhost:4000"
  echo "Frontend: http://localhost:3000"
  echo "Logs: docker logs -f site-backend-dev"
}

run_prod() {
  echo "Iniciando o container em modo prod..."
  docker-compose down
  docker-compose up -d app --build
  echo "API em produção: http://localhost:4000"
}

while true; do
  show_menu
  read -p "Escolha uma opção [1 - 3]: " option
  case $option in
    1)
      run_dev
      break
      ;;
    2)
      run_prod
      break
      ;;
    3)
      echo "Saindo..."
      exit 0
      ;;
    *)
      echo "Opção inválida. Tente novamente."
      sleep 2
      ;;
  esac
done