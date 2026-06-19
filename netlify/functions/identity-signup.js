/**
 * Netlify Identity registration hook — blocks signups outside the allowlist.
 * Deploy with the site; Netlify runs this automatically for identity-signup.
 */
const ALLOWED_EMAILS = new Set([
  "sidhu500sidhu@gmail.com",
  "anshual005@gmail.com",
]);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body);
    const email = (payload.user?.email || payload.email || "").trim().toLowerCase();

    if (!email || !ALLOWED_EMAILS.has(email)) {
      return {
        statusCode: 422,
        body: JSON.stringify({
          error:
            "Access denied. Only authorized Google accounts can use this admin panel.",
        }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({}) };
  } catch (err) {
    console.error("identity-signup validation error:", err);
    return { statusCode: 500, body: "Signup validation failed" };
  }
};
