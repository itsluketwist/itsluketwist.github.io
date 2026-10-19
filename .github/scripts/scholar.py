"""Fetch the total citation count from Google Scholar and save it to _data/scholar.json."""

import json
import os
from datetime import date
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import urlopen


# the "user=" value in the google scholar profile url (see google_scholar in _config.yml)
SCHOLAR_ID = "Fi0FXJUAAAAJ"

# jekyll exposes this file to the templates as site.data.scholar
OUTPUT_PATH = Path(__file__).parents[2] / "_data" / "scholar.json"

# google scholar blocks requests from github's servers, so we go through serpapi,
# which fetches the profile page for us (free plan: 250 requests per month)
SERPAPI_URL = "https://serpapi.com/search.json"


def main() -> None:
    """Look up the profile via serpapi and write its citation count to the data file."""
    # the key is a github secret in the workflow, or an environment variable locally
    api_key = os.environ.get("SERPAPI_KEY")
    if not api_key:
        raise ValueError("The SERPAPI_KEY environment variable is not set.")
    # only show the length, never the key itself
    print(f"Found SERPAPI_KEY ({len(api_key)} characters).")

    # request the profile, using serpapi's google scholar author api
    print(f"Fetching Google Scholar profile {SCHOLAR_ID} via SerpApi...")
    query = urlencode(
        {
            "engine": "google_scholar_author",
            "author_id": SCHOLAR_ID,
            "api_key": api_key,
        },
    )
    try:
        with urlopen(f"{SERPAPI_URL}?{query}", timeout=60) as response:
            profile = json.load(response)
    except HTTPError as error:
        # serpapi explains failures (e.g. a bad key, or no requests left) in the response body
        print(f"Request failed with HTTP {error.code}: {error.read().decode()}")
        raise

    # serpapi can also report problems in a successful response, as an "error" field
    if "error" in profile:
        raise ValueError(f"SerpApi returned an error: {profile['error']}")

    # the search id can be looked up in the serpapi dashboard, to see the raw response
    metadata = profile.get("search_metadata", {})
    print(f"SerpApi status: {metadata.get('status')} (search id: {metadata.get('id')})")

    # if the response layout ever changes, show what we got instead of just failing
    if "cited_by" not in profile:
        print(f"No 'cited_by' section in the response, which has: {list(profile)}")

    # the "cited by" table has one row each for citations, h-index and i10-index,
    # and "all" is the all-time total (as opposed to e.g. "since_2021")
    table = profile["cited_by"]["table"]
    print(f"Cited-by table: {json.dumps(table)}")
    citations = next(row["citations"]["all"] for row in table if "citations" in row)

    # fail the run rather than overwrite the last good value with something broken
    if not isinstance(citations, int):
        raise ValueError(f"Unexpected citation count from Google Scholar: {citations!r}")

    # "updated" is the date of this check (iso format, e.g. 2026-10-19), not when the count last changed
    data = {
        "citations": citations,
        "updated": date.today().isoformat(),
    }

    # show the old and new values side by side, to make changes easy to spot
    if OUTPUT_PATH.exists():
        print(f"Previous value: {OUTPUT_PATH.read_text().strip()}")
    print(f"New value: {json.dumps(data)}")

    OUTPUT_PATH.write_text(json.dumps(data, indent=2) + "\n")
    print(f"Saved {citations} citations to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
