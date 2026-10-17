from fastapi import APIRouter

from app.models.schemas import ContactMessage, ContactResponse
from app.services.contact import send_contact_message

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
def contact(msg: ContactMessage):
    send_contact_message(msg)
    return ContactResponse(ok=True, detail="¡Gracias! Te responderé pronto.")
