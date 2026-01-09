import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const names = formData.get("names");
    const lastnames = formData.get("lastnames");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const city = formData.get("city");
    const comment = formData.get("comment");
    const cv = formData.get("cv");

    if (!cv) {
      return new Response("Archivo no adjunto", { status: 400 });
    }

    const buffer = Buffer.from(await cv.arrayBuffer());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Correo a RH
    await transporter.sendMail({
      from: `"Postulación Web" <${process.env.EMAIL_USER}>`,
      to: "rhcontenedoresdeantioquia@gmail.com",
      subject: "Nueva postulación – Trabaja con nosotros",
      html: `
        <h3>Nueva postulación</h3>
        <p><b>Nombre:</b> ${names} ${lastnames}</p>
        <p><b>Correo:</b> ${email}</p>
        <p><b>Teléfono:</b> ${phone}</p>
        <p><b>Ciudad:</b> ${city}</p>
        <p><b>Comentario:</b> ${comment || "N/A"}</p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: buffer,
        },
      ],
    });

    // 📩 Respuesta automática al postulante
    await transporter.sendMail({
      from: `"Contenedores de Antioquia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recibimos tu hoja de vida",
      html: `
        <p>Hola ${names},</p>
        <p>Hemos recibido correctamente tu hoja de vida.</p>
        <p>Nuestro equipo de Talento Humano la revisará y te contactará si tu perfil avanza en el proceso.</p>
        <br />
        <p><b>Contenedores de Antioquia</b></p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("ERROR API WORK WITH US:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}
