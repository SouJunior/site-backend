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
  docker-compose -f docker-compose.yml up app-dev --build --watch
}

run_prod() {
  echo "Iniciando o container em modo prod..."
  docker-compose -f docker-compose.yml up app --build
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
