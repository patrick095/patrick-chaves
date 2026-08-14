import { SupportedLanguage } from "./i18n.models";

export interface ResumeDownload {
    readonly href: string;
    readonly filename: string;
}

const resumeDownloads = {
    "pt-BR": {
        href: "/pdfs/curriculo-patrick-chaves.pdf",
        filename: "Currículo - Patrick Chaves.pdf",
    },
    en: {
        href: "/pdfs/resume-patrick-chaves.pdf",
        filename: "Resume - Patrick Chaves.pdf",
    },
} as const satisfies Readonly<Record<SupportedLanguage, ResumeDownload>>;

export const resolveResumeDownload = (
    language: SupportedLanguage,
): ResumeDownload => resumeDownloads[language];
