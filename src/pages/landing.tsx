import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button, FeatureCard, TestimonialCard } from "@/components";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Play,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Link } from "@tanstack/react-router";

export function LandingPage() {
  const [readerCount, setReaderCount] = useState(30000);
  const [wordIndex, setWordIndex] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setReaderCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Interactive preview - word chunking demo
  const demoWords = [
    "Train",
    "your",
    "brain",
    "to",
    "read",
    "faster",
    "with",
    "science",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % demoWords.length);
    }, 600);
    return () => clearInterval(interval);
  }, [demoWords.length]);

  return (
    <div>
      <div className="max-w-6xl py-10 lg:py-24 px-4 mx-auto">
        <div className="text-center">
          {/* Live Counter Badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full border border-primary/20">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm">
                +{readerCount.toLocaleString()} readers improved their speed by
                2x
              </span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            exit={{ opacity: 0, y: -40 }}
            className="text-5xl md:text-7xl tracking-tight"
          >
            <strong>Read faster.</strong>
            <br />
            <span className="text-primary">Understand better.</span>
            <br />
            Build lifelong focus.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 justify-center"
          >
            <Button asChild className="mt-10" size="lg">
              <Link to="/auth">
                Get Started
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="link" className="mt-10" size="lg">
              Watch Video <Play />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 initial={{ y: 30 }} className="text-4xl text-center mb-12">
            Everything you need to{" "}
            <span className="text-primary">master reading</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="size-8 text-primary" />}
              title="AI Reading Coach"
              description="Personalized sessions that train your eyes and brain to read more efficiently with adaptive difficulty."
            />
            <FeatureCard
              icon={<TrendingUp className="size-8 text-primary" />}
              title="Progress Analytics"
              description="Beautiful charts showing your improvements in speed, comprehension, and focus over time."
            />
            <FeatureCard
              icon={<Award className="size-8 text-primary" />}
              title="Gamified Learning"
              description="Earn XP, unlock achievements, maintain streaks, and level up your reading mastery."
            />
            <FeatureCard
              icon={<Target className="size-8 text-primary" />}
              title="Daily Goals"
              description="Set personalized reading goals and get reminded to stay consistent with your training."
            />
            <FeatureCard
              icon={<BookOpen className="size-8 text-primary" />}
              title="RSVP Training"
              description="Rapid Serial Visual Presentation technology to eliminate subvocalization and boost speed."
            />
            <FeatureCard
              icon={<Zap className="size-8 text-primary" />}
              title="Focus Builder"
              description="Scientifically designed exercises to improve attention span and reading stamina."
            />
          </div>
        </div>
      </section>

      {/* Interactive Preview Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-2xl mx-auto py-16 px-4"
      >
        <div className="text-center mb-6">
          <h3 className="mb-2">Try It Now: Speed Reading Preview</h3>
          <p className="text-sm text-muted-foreground">
            Watch words flash at increasing speeds — this is how training feels
          </p>
        </div>
        <div className="bg-card border rounded-xl p-12 flex items-center justify-center min-h-[150px]">
          <motion.div
            key={wordIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl text-primary"
          >
            {demoWords[wordIndex]}
          </motion.div>
        </div>
      </motion.div>

      {/* Visual Proof & Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <h2 className="text-center mb-8">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TestimonialCard
            name="Sarah Chen"
            department="Graduate Student"
            text="I went from 250 WPM to 600 WPM in just 3 weeks. This platform transformed how I consume academic papers."
            rating={5}
            improvement="2.4x faster"
          />
          <TestimonialCard
            name="Michael Rodriguez"
            department="Product Manager"
            text="The focus drills helped eliminate my subvocalization habit. I'm reading reports 3x faster now with better retention."
            rating={5}
            improvement="3x faster"
          />
          <TestimonialCard
            name="Emma Thompson"
            department="Content Writer"
            text="As someone with ADHD, the calm interface and one-task focus mode changed everything. I can finally focus on reading."
            rating={5}
            improvement="2.1x faster"
          />
          <TestimonialCard
            name="David Kim"
            department="Software Engineer"
            text="Perfect for technical documentation. The comprehension tracking ensures I'm not just skimming — I'm actually learning."
            rating={5}
            improvement="2.8x faster"
          />
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="text-center max-w-2xl px-4 pb-16 mx-auto"
      >
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border rounded-2xl p-12">
          <h2 className="mb-4">Ready to Transform Your Reading?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of readers who've doubled their speed while
            maintaining comprehension
          </p>

          <Button asChild size="lg" variant={"default"}>
            <Link to="/">Start Your Free Test Now</Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            No credit card required • 5-minute assessment • Instant results
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className=" bg-sidebar"
      >
        <div className="container mx-auto max-w-6xl px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl text-primary mb-2">60%</div>
              <div className="text-muted-foreground">
                Average speed improvement
              </div>
            </div>
            <div>
              <div className="text-5xl text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active readers</div>
            </div>
            <div>
              <div className="text-5xl text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">User rating</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
