import Image from "next/image"
import { Button } from "@shared/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { Alert, AlertDescription } from "@shared/ui/alert"
import type { Metadata } from "next"
import Link from "next/link"
import {
  Calculator,
  Search,
  FileText,
  Car,
  Truck,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  MapPin,
  Star,
  Zap,
  Link2,
} from "lucide-react"
import { cn } from "@shared/lib/utils"
import { Header } from "@widgets/header"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Автомобили из Китая",
  description: "Покупка и доставка автомобилей из Китая напрямую",
}

export default async function Page() {
  const t = await getTranslations("main")

  const processSteps = [
    {
      icon: Search,
      color: "bg-blue-500",
      step: t("processSteps.step01.step"),
      label: t("processSteps.step01.title"),
      description: t("processSteps.step01.description"),
      time: t("processSteps.step01.time"),
    },
    {
      icon: Calculator,
      color: "bg-green-500",
      step: t("processSteps.step02.step"),
      label: t("processSteps.step02.title"),
      description: t("processSteps.step02.description"),
      time: t("processSteps.step02.time"),
    },
    {
      icon: FileText,
      color: "bg-orange-500",
      step: t("processSteps.step03.step"),
      label: t("processSteps.step03.title"),
      description: t("processSteps.step03.description"),
      time: t("processSteps.step03.time"),
    },
    {
      icon: Truck,
      color: "bg-purple-500",
      step: t("processSteps.step04.step"),
      label: t("processSteps.step04.title"),
      description: t("processSteps.step04.description"),
      time: t("processSteps.step04.time"),
    },
  ]

  const platformList = [
    {
      url: "https://www.renrenche.com/",
      logo: "renrenche.png",
      label: t("platformList.renrenche.title"),
      description: t("platformList.renrenche.description"),
    },
    {
      url: "https://m.taocheche.com/",
      logo: "taocheche.png",
      logoBackgroundClass: "bg-blue-800",
      label: t("platformList.taocheche.title"),
      description: t("platformList.taocheche.description"),
    },
    {
      url: "https://www.dongchedi.com/",
      logo: "donchedi.svg",
      label: t("platformList.dongchedi.title"),
      description: t("platformList.dongchedi.description"),
    },
    {
      url: "https://www.autohome.com.cn/",
      logo: "qichezhijia.png",
      label: t("platformList.autohome.title"),
      description: t("platformList.autohome.description"),
    },
    {
      url: "https://www.guazi.com/",
      logo: "guazi.png",
      label: t("platformList.guazi.title"),
      description: t("platformList.guazi.description"),
    },
    {
      url: "https://www.che168.com/",
      logo: "2sclogo@2x.png",
      label: t("platformList.che168.title"),
      description: t("platformList.che168.description"),
    },
  ]

  const features = [
    {
      icon: Shield,
      highlight: true,
      label: t("features.qualityGuarantee.title"),
      description: t("features.qualityGuarantee.description"),
    },
    {
      icon: DollarSign,
      highlight: false,
      label: t("features.transparentPrice.title"),
      description: t("features.transparentPrice.description"),
    },
    {
      icon: Truck,
      highlight: true,
      label: t("features.fastDelivery.title"),
      description: t("features.fastDelivery.description"),
    },
    {
      icon: Zap,
      highlight: false,
      label: t("features.instantCalculation.title"),
      description: t("features.instantCalculation.description"),
    },
  ]

  return (
    <>
      <Header title={t("title")} />
      <div className="min-h-screen bg-background space-y-10">
        {/* Compact Hero Section */}
        <section>
          <div className="max-w-4xl mx-auto">
            {/* Primary CTA */}
            <div className="space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full h-12 text-base font-semibold"
              >
                <Link href="/calc">
                  <Calculator className="mr-2 h-5 w-5" />
                  {t("upperPart.calculator")}
                </Link>
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild className="h-10">
                  <Link href="/callback">
                    <Phone className="h-4 w-4" />
                    {t("upperPart.backcall")}
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-10">
                  <Link href="/contact">
                    <MapPin className="h-4 w-4" />
                    {t("upperPart.contact")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-center mb-4">
              {t("features.title")}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`p-4 ${feature.highlight ? "border-primary bg-primary/5" : ""}`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${feature.highlight ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm leading-tight">
                        {feature.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms Grid */}
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{t("platformList.title")}</h2>
              <Badge variant="outline" className="text-xs">
                {t("platformList.country")}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {platformList.map((platform, index) => (
                <Card key={index} className="">
                  <CardHeader>
                    {platform.logo && (
                      <div
                        className={cn(
                          `${platform.logoBackgroundClass}`,
                          platform.logoBackgroundClass
                            ? "w-fit px-8"
                            : "w-full",
                          "h-8 relative "
                        )}
                      >
                        <Image
                          src={`/platforms/${platform.logo}`}
                          alt={platform.label}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    )}
                    <CardTitle>{platform.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {platform.description}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <Link target="_blank" href={platform.url}>
                        <Link2 />
                        {t("platformList.url")}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Compact Process Timeline */}
        <section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-4">
              {t("processSteps.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="p-3 h-full">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-primary rounded-full flex items-center justify-center">
                        <step.icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="text-xs font-bold text-primary mb-1">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {step.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      <Badge variant="secondary" className="text-xs py-0">
                        {step.time}
                      </Badge>
                    </div>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <div className="max-w-4xl mx-auto">
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle className="h-5 w-5 text-primary" />
              <AlertDescription>
                <div className="flex items-center justify-between w-full gap-2">
                  <div>
                    <div className="font-semibold mb-1">
                      {t("consultation.title")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("consultation.description")}
                    </div>
                  </div>
                  <div>
                    <Button asChild>
                      <Link href="/callback">
                        {t("consultation.button")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Footer Info */}
        <section>
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-semibold">
                  {t("footerInfo.officeRussia.title")}
                </div>
                <div className="text-muted-foreground">
                  {t("footerInfo.officeRussia.description")}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  {t("footerInfo.officeChina.title")}
                </div>
                <div className="text-muted-foreground">
                  {t("footerInfo.officeChina.description")}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  {t("footerInfo.phone.title")}
                </div>
                <div className="text-muted-foreground">
                  {t("footerInfo.phone.description")}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  {t("footerInfo.email.title")}
                </div>
                <div className="text-muted-foreground">
                  {t("footerInfo.email.description")}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
