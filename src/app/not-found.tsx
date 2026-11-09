import { ButtonLink, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container not-found">
        <Eyebrow>404 / PAGE NOT FOUND</Eyebrow>
        <h1>
          Let’s get you
          <br />
          back on track.
        </h1>
        <p>
          The page you’re looking for isn’t here. Explore our services or head
          back home.
        </p>
        <div className="recovery-links">
          <ButtonLink href="/services/">Explore services</ButtonLink>
          <ButtonLink href="/contact/" secondary>
            Contact HFS
          </ButtonLink>
          <ButtonLink href="/" secondary>
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
