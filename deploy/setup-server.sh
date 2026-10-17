#!/usr/bin/env bash
# Preparación inicial del servidor (Ubuntu 22.04/24.04 o Debian 12, p. ej. Google Compute Engine).
# Se ejecuta UNA sola vez con sudo:
#   curl -fsSL https://raw.githubusercontent.com/<usuario>/<repo>/main/deploy/setup-server.sh -o setup.sh
#   sudo bash setup.sh https://github.com/<usuario>/<repo>.git
set -euo pipefail

REPO_URL="${1:?Uso: sudo bash setup-server.sh <url-del-repo-git>}"
DEPLOY_USER="deploy"

echo "==> Actualizando paquetes"
apt-get update -y && apt-get upgrade -y
apt-get install -y git curl ufw

echo "==> Swap de 2 GB (evita que el build del frontend se quede sin memoria en máquinas de 1 GB)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Instalando Docker"
if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

echo "==> Creando usuario '$DEPLOY_USER' (lo usa GitHub Actions para desplegar)"
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi
usermod -aG docker "$DEPLOY_USER"
mkdir -p /home/$DEPLOY_USER/.ssh
chmod 700 /home/$DEPLOY_USER/.ssh
touch /home/$DEPLOY_USER/.ssh/authorized_keys
chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh

echo "==> Firewall local: solo SSH, HTTP y HTTPS (en GCP también hay que permitir HTTP/HTTPS en la consola)"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw --force enable

echo "==> Clonando el repositorio"
sudo -u $DEPLOY_USER git clone "$REPO_URL" /home/$DEPLOY_USER/portfolio

echo
echo "Listo. Falta:"
echo "  1. Pegar la llave PÚBLICA de despliegue en /home/$DEPLOY_USER/.ssh/authorized_keys"
echo "  2. Primer arranque:  sudo -u $DEPLOY_USER bash -c 'cd ~/portfolio && docker compose -f docker-compose.prod.yml up -d --build'"
