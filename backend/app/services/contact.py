import logging

from app.models.schemas import ContactMessage

logger = logging.getLogger(__name__)


def send_contact_message(msg: ContactMessage) -> None:
    # TODO: enviar por SMTP / Resend o guardar en base de datos.
    logger.info("Nuevo mensaje de %s <%s>: %s", msg.name, msg.email, msg.message[:80])
