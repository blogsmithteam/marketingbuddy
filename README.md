# MktgBuddy: Audio to Marketing Content Platform

This is a [Next.js](https://nextjs.org) project that helps content creators transform audio recordings and text documents into marketing materials and publish them online.

## Product Requirements Document (PRD)

### Product Overview

MktgBuddy is a web application that automates the process of converting audio recordings and text documents into marketing content. Users can upload text documents or audio files, which are then transcribed, analyzed, and transformed into various marketing materials ready for distribution across multiple platforms.

### Target Users

Content creators, marketers, podcasters, and businesses who want to efficiently repurpose audio and text content into marketing materials.

### User Stories and Features

#### Authentication

- Users can create an account and log in securely
- User data and campaigns are stored privately and securely
- Profile management

#### Campaign Management

- Users can view a dashboard listing all their campaigns
- Each campaign represents a single audio recording or text document and its derived content
- Users can filter and search through their campaigns

#### Campaign Creation

- Users can create a new campaign by uploading an audio file or text document
- Users can name their campaign and add basic metadata including:
  - Title
  - Date
  - Status
  - Platform specific descriptions
  - Social media content generation
- Supported audio formats: MP3, WAV, M4A (to be confirmed)
- Supported text formats: docx, PPTx, PDF

#### Audio Processing

- System automatically transcribes the uploaded audio using AI
- System cleans up the raw transcript to improve readability
- System identifies key topics and timestamps within the content

#### Content Generation

- System automatically generates platform-specific descriptions:
  - YouTube description with timestamps when relevant
  - Blog post description
  - Email newsletter teaser
- System creates draft social media posts for X, Bluesky, and LinkedIn highlighting key points from the content

#### Content Management

- Users can review, edit, and approve all AI-generated content
- Users can save drafts and finalize content when ready

#### Publishing

- Direct publishing to connected platforms (X, Bluesky, LinkedIn)
- OAuth integration for secure platform connections
- Scheduling of content release
- Preview of how content will appear on each platform

#### Analytics & Reporting (Future Feature)

- Performance tracking for published content across platforms
- Engagement metrics (views, likes, shares, comments)
- Audience demographics and insights
- Campaign comparison and trend analysis
- Exportable reports for stakeholder presentations
- Content performance recommendations

### Subscription Tiers

- **Free Tier**: Up to 3 campaigns, basic features
- **Standard Tier**: $29/month, up to 10 campaigns, all features
- **Professional Tier**: $49/month, up to 25 campaigns, all features, priority processing

### Payment Processing

- **Stripe Integration** for secure payment processing
- Users prompted to enter payment details when:
  - Signing up directly for a paid plan
  - Upgrading from free to paid plan
  - Reaching the limit of free campaigns
- Subscription management portal for users to:
  - Update payment methods
  - Change subscription tiers
  - View billing history
  - Cancel subscription
- Automated email receipts and payment notifications
- Prorated billing for mid-cycle tier changes
- Grace period for failed payments with automated retry
- Webhook handling for Stripe events (successful payments, failed payments, etc.)

### Technical Requirements

- Secure user authentication system
- Audio file storage and processing
- Integration with AI APIs for:
  - Speech-to-text transcription (Suggested: OpenAI Whisper, AssemblyAI, or Google Speech-to-Text)
  - Text refinement and cleanup (Suggested: OpenAI GPT-4, Anthropic Claude, or Cohere)
  - Topic extraction and timestamp identification (Suggested: OpenAI GPT-4, Anthropic Claude)
  - Content generation for different platforms (Suggested: OpenAI GPT-4, Anthropic Claude)
- Social media API integrations:
  - X (Twitter) API
  - Bluesky API
  - LinkedIn API
- **Stripe API** integration for payment processing
- Responsive web interface that works on desktop and mobile

### Processing Pipeline

The application follows a structured pipeline for processing content from upload to publication:

#### 1. Content Ingestion

- User uploads audio file or text document
- System validates file format, size, and content
- File is stored in S3 with appropriate metadata
- Processing job is queued in background task system

#### 2. Transcription (Audio Only)

- Audio file is sent to transcription service (e.g., OpenAI Whisper)
- Raw transcript is generated with speaker identification when possible
- Confidence scores are tracked for potential low-quality segments
- Initial timestamps are captured for later refinement

#### 3. Content Cleanup

- Raw transcript or document text is processed for:
  - Formatting improvements
  - Grammar and punctuation correction
  - Removal of filler words and repetitions
  - Standardization of terminology
- Clean version is stored alongside the original

#### 4. Topic Extraction & Timestamp Refinement

- AI analyzes content to identify key topics and themes
- For audio content, timestamps are refined and associated with topics
- Topics are ranked by relevance and importance
- Content structure is mapped (introduction, main points, conclusion)

#### 5. Content Generation

- Platform-specific descriptions are created based on content and topics
- Social media posts are drafted highlighting key insights
- All generated content maintains consistent tone and messaging
- Content is tagged with appropriate metadata for searchability

#### 6. Review & Approval

- User is notified when processing is complete
- User can review, edit, and approve generated content
- Changes are tracked for potential AI model improvement
- Approved content is marked ready for publishing

#### 7. Publishing

- Approved content is scheduled or immediately published
- System handles API authentication and rate limiting
- Confirmation of successful publishing is provided
- Publishing history is maintained for reference

#### 8. Monitoring & Analytics (Future)

- Published content performance is tracked across platforms
- Engagement metrics are collected and analyzed
- Performance insights are generated for user review
- Content effectiveness recommendations are provided

### Data Storage Architecture

#### File Storage

- **Amazon S3** for storing:
  - Original audio files
  - Uploaded text documents
  - Generated media assets
  - Backup of transcripts and generated content
- Organized in buckets by user/organization with appropriate access controls
- Lifecycle policies to manage storage costs for older campaigns

#### Database

- **PostgreSQL via Supabase** for primary data storage:
  - User accounts and authentication
  - Campaign metadata
  - Transcripts and generated content
  - Platform connections and credentials (encrypted)
  - Content publishing history
- Leveraging Supabase's Row Level Security for data protection
- Database schema designed for efficient querying and relationship management

#### Caching

- **Redis** for performance optimization:
  - Session management
  - Frequently accessed campaign data
  - API response caching
  - Rate limiting for external API calls
  - Background job management
- Configured with appropriate TTL (Time To Live) settings for different data types

#### Search Functionality

- **PostgreSQL Full-Text Search** for:
  - Campaign content search
  - Transcript search and filtering
  - Topic and keyword identification
  - Content discovery across campaigns
- Optimized indexes for search performance
- Trigram similarity for fuzzy matching capabilities

### User Stories

**As a user, I want to**

- Upload content (audio or text) file and give it a title
- Get an accurate audio transcript automatically
- Receive a cleaned-up, readable version of the transcript
- See key topics with timestamps automatically identified
- Generate platform-specific descriptions
- Create social media posts to promote the campaign
- Track the status of the content generation for each campaign
- Directly publish content to my connected social media accounts
- Schedule posts for optimal engagement times

**Future capabilities**

- See analytics on how my published content performs
- Compare performance across different platforms
- Understand which content topics generate the most engagement
- Export reports for team meetings and stakeholder presentations

### Open Questions

- What are the maximum file sizes and durations for audio uploads?
- How will we handle rate limits from social media APIs?
- Which analytics platforms will we integrate with for the reporting feature?
- Will there be team collaboration features in future versions?

### Future Enhancements

- **Annual Billing Option**: Implement discounted annual billing (e.g., 20% discount for annual commitment)
- **Referral Program**: Create a system for users to refer others and receive rewards (e.g., free months, campaign credits)
- **Team Collaboration**: Allow multiple team members to work on campaigns with role-based permissions
- **White-Label Solution**: Offer enterprise customers the ability to rebrand the platform
- **API Access**: Provide API endpoints for programmatic access to the platform's features
- **Advanced Analytics**: Deeper insights and custom reporting options

### Development Considerations

#### Detailed Development Roadmap for MktgBuddy

##### Phase 1: MVP Development (Core Functionality)

1. Project Setup and Infrastructure (2 weeks)
   [ ] Initialize Next.js project with TypeScript and App Router
   [ ] Set up Tailwind CSS and Shadcn UI component library
   [ ] Configure ESLint, Prettier, and other development tools
   [ ] Set up CI/CD pipeline with Vercel
   [ ] Create project structure and architecture documentation
   [ ] Set up Supabase project and configure authentication
   [ ] Configure S3 buckets for file storage
   [ ] Set up Redis for caching and background job management
2. Authentication System (2 weeks)
   [ ] Implement user registration and login with Supabase Auth
   [ ] Create profile management pages
   [ ] Set up email verification flow
   [ ] Implement password reset functionality
   [ ] Create protected routes and authentication middleware
   [ ] Design and implement user onboarding flow
   [ ] Set up Row Level Security policies in Supabase
3. Database Schema and API Layer (2 weeks)
   [ ] Design and implement database schema for users, campaigns, and content
   [ ] Create API endpoints for CRUD operations
   [ ] Implement data validation with Zod
   [ ] Set up TypeScript types generation from database schema
   [ ] Create service layer for business logic
   [ ] Implement error handling and logging
   [ ] Set up database migrations system
4. File Upload and Storage System (2 weeks)
   [ ] Implement file upload component with drag-and-drop functionality
   [ ] Create backend handlers for file processing and storage in S3
   [ ] Implement file type validation and security checks
   [ ] Set up file metadata extraction
   [ ] Create file preview functionality
   [ ] Implement progress indicators for uploads
   [ ] Set up background processing queue for file handling
5. Audio Transcription Service (3 weeks)
   [ ] Integrate with OpenAI Whisper API for audio transcription
   [ ] Implement audio file preprocessing for optimal transcription
   [ ] Create transcript storage and versioning system
   [ ] Implement transcript editing interface
   [ ] Set up speaker identification when possible
   [ ] Create timestamp extraction and management
   [ ] Implement transcript quality assessment
6. Content Analysis and Enhancement (3 weeks)
   [ ] Integrate with Anthropic Claude API for content analysis
   [ ] Implement topic extraction and categorization
   [ ] Create timestamp refinement for audio content
   [ ] Implement content structure mapping
   [ ] Create content cleanup and enhancement pipeline
   [ ] Implement keyword and entity extraction
   [ ] Set up content quality scoring system
7. Content Generation (3 weeks)
   [ ] Implement platform-specific description generation
   [ ] Create social media post generation for X, Bluesky, and LinkedIn
   [ ] Implement content customization options
   [ ] Create content templates and variation system
   [ ] Implement tone and style customization
   [ ] Set up content approval workflow
   [ ] Create content editing interface
8. Campaign Management Dashboard (2 weeks)
   [ ] Design and implement campaign listing page
   [ ] Create campaign detail view
   [ ] Implement campaign filtering and search
   [ ] Create campaign status tracking system
   [ ] Implement campaign metadata management
   [ ] Create campaign analytics dashboard (basic metrics)
   [ ] Implement campaign archiving and deletion
9. Basic Publishing Functionality (2 weeks)
   [ ] Implement OAuth integration for X, Bluesky, and LinkedIn
   [ ] Create secure credential storage system
   [ ] Implement basic content publishing to platforms
   [ ] Create publishing confirmation and status tracking
   [ ] Implement error handling for publishing failures
   [ ] Create publishing history view
   [ ] Set up rate limiting and queue system for API calls
10. Testing and Quality Assurance (2 weeks)
    [ ] Implement unit tests for core functionality
    [ ] Create integration tests for critical user flows
    [ ] Set up end-to-end testing with Cypress
    [ ] Perform security audit and vulnerability testing
    [ ] Conduct performance testing and optimization
    [ ] Implement accessibility testing and improvements
    [ ] Create documentation for MVP features

##### Phase 2: Enhanced Features (8-10 weeks)

1. Content Scheduling System (2 weeks)
   [ ] Design and implement content scheduling interface
   [ ] Create scheduling backend with job queue
   [ ] Implement timezone handling and validation
   [ ] Create recurring schedule options
   [ ] Implement schedule conflict detection
   [ ] Create schedule visualization calendar
   [ ] Set up notifications for scheduled publications
2. Advanced Content Editing (3 weeks)
   [ ] Implement rich text editor for content editing
   [ ] Create version history and comparison tools
   [ ] Implement AI-assisted content improvement suggestions
   [ ] Create content templates library
   [ ] Implement content branching for A/B testing
   [ ] Create content approval workflows with comments
   [ ] Implement content translation capabilities
3. Platform Preview System (2 weeks)
   [ ] Create visual previews for how content will appear on each platform
   [ ] Implement platform-specific character limits and formatting
   [ ] Create image and media preview functionality
   [ ] Implement link preview generation
   [ ] Create mobile vs. desktop preview options
   [ ] Implement preview sharing functionality
   [ ] Create preview history for comparison
4. Subscription and Payment System (3 weeks)
   [ ] Integrate Stripe for payment processing
   [ ] Implement subscription tier management
   [ ] Create payment portal and billing history
   [ ] Implement usage tracking for free tier limits
   [ ] Create upgrade prompts and flows
   [ ] Implement invoice generation and delivery
   [ ] Set up webhook handling for Stripe events

##### Phase 3: Analytics and Advanced Features (10-12 weeks)

1. Analytics Integration (3 weeks)
   [ ] Design and implement analytics dashboard
   [ ] Create data collection system for published content
   [ ] Implement engagement metrics tracking
   [ ] Create performance comparison tools
   [ ] Implement audience demographics visualization
   [ ] Create custom reporting functionality
   [ ] Set up automated insights generation
2. Advanced Reporting (2 weeks)
   [ ] Create exportable reports in multiple formats
   [ ] Implement custom report builder
   [ ] Create scheduled report delivery system
   [ ] Implement data visualization components
   [ ] Create benchmark comparison functionality
   [ ] Implement trend analysis tools
   [ ] Create stakeholder presentation templates
3. Content Performance Optimization (3 weeks)
   [ ] Implement A/B testing framework for content
   [ ] Create performance prediction models
   [ ] Implement content recommendation engine
   [ ] Create optimal posting time suggestions
   [ ] Implement audience targeting recommendations
   [ ] Create content improvement suggestions based on performance
   [ ] Implement competitive analysis tools
4. Advanced AI Features (4 weeks)
   [ ] Implement sentiment analysis for content
   [ ] Create audience reaction prediction
   [ ] Implement content personalization based on audience
   [ ] Create advanced topic modeling and trend detection
   [ ] Implement multi-language support
   [ ] Create voice and tone customization
   [ ] Implement brand voice consistency checking

##### Phase 4: Revenue Optimization and Enterprise Features (12-14 weeks)

1. Annual Billing and Discounts (2 weeks)
   [ ] Implement annual billing option with discount
   [ ] Create billing cycle management
   [ ] Implement prorated upgrades and downgrades
   [ ] Create discount code system
   [ ] Implement subscription lifecycle management
   [ ] Create renewal notifications and management
   [ ] Implement billing history and receipt generation
2. Referral Program (3 weeks)
   [ ] Design and implement referral tracking system
   [ ] Create referral link generation
   [ ] Implement reward distribution system
   [ ] Create referral dashboard for users
   [ ] Implement fraud detection for referrals
   [ ] Create promotional materials for referrers
   [ ] Implement referral analytics and reporting
3. Team Collaboration Features (4 weeks)
   [ ] Implement team account management
   [ ] Create role-based permissions system
   [ ] Implement content approval workflows
   [ ] Create team activity tracking
   [ ] Implement commenting and feedback system
   [ ] Create team performance analytics
   [ ] Implement team billing and seat management
4. White-Label Solution (3 weeks)
   [ ] Create customizable branding options
   [ ] Implement custom domain support
   [ ] Create theme customization system
   [ ] Implement email template customization
   [ ] Create custom login and registration pages
   [ ] Implement brand asset management
   [ ] Create white-label documentation
5. API Access (2 weeks)
   [ ] Design and implement public API
   [ ] Create API documentation
   [ ] Implement API key management
   [ ] Create usage limits and throttling
   [ ] Implement webhook system for events
   [ ] Create SDK for common programming languages
   [ ] Implement API analytics and monitoring
   Ongoing Throughout All Phases
6. Security and Compliance
   [ ] Regular security audits and penetration testing
   [ ] GDPR and data privacy compliance implementation
   [ ] PCI DSS compliance for payment processing
   [ ] Implementation of data retention policies
   [ ] Regular dependency updates and vulnerability scanning
   [ ] Security documentation and training
7. Performance Optimization
   [ ] Regular performance audits and improvements
   [ ] Database query optimization
   [ ] Frontend performance optimization
   [ ] CDN configuration and optimization
   [ ] Image and media optimization
   [ ] Caching strategy refinement
   [ ] Load testing and scalability improvements
8. User Experience Improvements
   [ ] User feedback collection and analysis
   [ ] Usability testing and improvements
   [ ] Accessibility audits and enhancements
   [ ] Mobile responsiveness optimization
   [ ] User onboarding refinement
   [ ] Help documentation and tooltips
   [ ] Error message improvement and clarity

#### Technical Decisions

- **Frontend Framework**: Next.js with App Router for server components and routing
- **UI Components**: Tailwind CSS with Shadcn UI component library
- **State Management**: React Context for global state, React Query for server state
- **Authentication**: Supabase Auth with social login options
- **Deployment**: Vercel for frontend, AWS Lambda for background processing
- Nova 2 for audio to transcript processing
- Claude Sonnet 3.7 for transcript enhancement and social media content generation

#### API Rate Limiting

- Implement queue system for social media posting to respect API rate limits
- Use Redis for tracking API usage and implementing backoff strategies
- Provide clear feedback to users about posting status and delays

#### Error Handling

- Graceful degradation when AI services are unavailable
- Retry mechanisms for transient failures
- Clear error messages and recovery options for users

#### Security Considerations

- Encrypt sensitive data (OAuth tokens, API keys, payment information) at rest
- Implement proper CORS policies
- Regular security audits and dependency updates
- GDPR and data privacy compliance
- PCI DSS compliance for payment processing

#### Performance Optimization

- Implement background processing for long-running tasks
- Optimize file uploads with chunking for large audio files
- Use WebSockets for real-time status updates during processing

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
