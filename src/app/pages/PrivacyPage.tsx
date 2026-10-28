import { business } from "../../config/site";
import { BackToHome } from "../../components/BackToHome";
export function PrivacyPage() {
  return (
    <main className="text-page" id="main" tabIndex={-1}>
      <p className="eyebrow">a small housekeeping note</p>
      <h1>privacy, plainly.</h1>
      <p>
        this website doesn’t use advertising trackers, analytics, or a
        mailing-list form.
      </p>
      <h2>your preferences</h2>
      <p>
        if you choose light or dark mode, that choice is saved in your browser.
        otherwise, the site follows your device’s appearance setting.
      </p>
      <h2>getting in touch</h2>
      <p>
        the email link opens your email app so you can write to jacob directly.
        this website does not collect or store your message.
      </p>
      <h2>hosting</h2>
      <p>
        the hosting provider may process technical request information to
        deliver and protect the site.
      </p>
      <p>
        questions? <a href={`mailto:${business.email}`}>{business.email}</a>
      </p>
      <BackToHome />
    </main>
  );
}
