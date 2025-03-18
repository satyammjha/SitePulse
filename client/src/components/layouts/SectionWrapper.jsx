export default function SectionWrapper({ children, className, id }) {
    return (
      <section className={`py-20 ${className}`} id={id}>
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  }