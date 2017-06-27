CREATE TABLE [dbo].[RapQuotes]
(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Quote] [varchar](1000) NULL,
	[Quotee] [varchar](1000) NULL,
	[Votes] [int] NULL
)
