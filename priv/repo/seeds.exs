# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Or reset and seed:
#
#     mix ecto.reset

alias NbPingcrm.Repo
alias NbPingcrm.Accounts.{Account, User}
alias NbPingcrm.CRM.{Organization, Contact}

# Clear existing data (optional - comment out if you want to keep existing data)
Repo.delete_all(Contact)
Repo.delete_all(Organization)
Repo.delete_all(User)
Repo.delete_all(Account)

IO.puts("Seeding database...")

# Create demo account
account =
  Repo.insert!(%Account{
    name: "Acme Corporation"
  })

IO.puts("Created account: #{account.name}")

# Create demo owner user (johndoe@example.com)
owner =
  Repo.insert!(%User{
    account_id: account.id,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    hashed_password: Bcrypt.hash_pwd_salt("secret"),
    owner: true,
    confirmed_at: DateTime.utc_now(:second)
  })

IO.puts("Created owner: #{owner.first_name} #{owner.last_name} (#{owner.email})")

# Create additional users
users_data = [
  %{first_name: "Jane", last_name: "Smith", email: "janesmith@example.com", owner: false},
  %{first_name: "Bob", last_name: "Wilson", email: "bobwilson@example.com", owner: false},
  %{first_name: "Alice", last_name: "Johnson", email: "alicejohnson@example.com", owner: false},
  %{first_name: "Charlie", last_name: "Brown", email: "charliebrown@example.com", owner: false},
  %{first_name: "Diana", last_name: "Ross", email: "dianaross@example.com", owner: false},
  %{first_name: "Edward", last_name: "Norton", email: "edwardnorton@example.com", owner: false},
  %{first_name: "Fiona", last_name: "Apple", email: "fionaapple@example.com", owner: false},
  %{first_name: "George", last_name: "Lucas", email: "georgelucas@example.com", owner: false},
  %{first_name: "Hannah", last_name: "Montana", email: "hannahmontana@example.com", owner: false}
]

users =
  Enum.map(users_data, fn data ->
    user =
      Repo.insert!(%User{
        account_id: account.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        hashed_password: Bcrypt.hash_pwd_salt("secret"),
        owner: data.owner,
        confirmed_at: DateTime.utc_now(:second)
      })

    IO.puts("Created user: #{user.first_name} #{user.last_name}")
    user
  end)

IO.puts("Created #{length(users)} additional users")

# Create organizations
organizations_data = [
  %{
    name: "Stark Industries",
    email: "contact@stark.com",
    phone: "555-0100",
    address: "200 Park Avenue",
    city: "New York",
    region: "NY",
    country: "US",
    postal_code: "10166"
  },
  %{
    name: "Wayne Enterprises",
    email: "info@wayne.com",
    phone: "555-0101",
    address: "1 Wayne Tower",
    city: "Gotham",
    region: "NJ",
    country: "US",
    postal_code: "07001"
  },
  %{
    name: "Oscorp Industries",
    email: "hello@oscorp.com",
    phone: "555-0102",
    address: "500 5th Avenue",
    city: "New York",
    region: "NY",
    country: "US",
    postal_code: "10110"
  },
  %{
    name: "LexCorp",
    email: "contact@lexcorp.com",
    phone: "555-0103",
    address: "1000 Lexington Ave",
    city: "Metropolis",
    region: "DE",
    country: "US",
    postal_code: "19801"
  },
  %{
    name: "Umbrella Corporation",
    email: "info@umbrella.com",
    phone: "555-0104",
    address: "1 Raccoon Street",
    city: "Raccoon City",
    region: "CO",
    country: "US",
    postal_code: "80014"
  },
  %{
    name: "Cyberdyne Systems",
    email: "sales@cyberdyne.com",
    phone: "555-0105",
    address: "18144 El Camino Real",
    city: "Sunnyvale",
    region: "CA",
    country: "US",
    postal_code: "94087"
  },
  %{
    name: "Weyland-Yutani",
    email: "investors@weyland.com",
    phone: "555-0106",
    address: "1 Colonial Way",
    city: "San Francisco",
    region: "CA",
    country: "US",
    postal_code: "94102"
  },
  %{
    name: "Tyrell Corporation",
    email: "replicants@tyrell.com",
    phone: "555-0107",
    address: "2019 Blade Runner Blvd",
    city: "Los Angeles",
    region: "CA",
    country: "US",
    postal_code: "90001"
  },
  %{
    name: "Initech",
    email: "tps@initech.com",
    phone: "555-0108",
    address: "4120 Friden Drive",
    city: "Austin",
    region: "TX",
    country: "US",
    postal_code: "78744"
  },
  %{
    name: "Hooli",
    email: "pivot@hooli.com",
    phone: "555-0109",
    address: "1 Infinite Loop of Disruption",
    city: "Palo Alto",
    region: "CA",
    country: "US",
    postal_code: "94301"
  },
  %{
    name: "Pied Piper",
    email: "compression@piedpiper.com",
    phone: "555-0110",
    address: "5230 Newell Road",
    city: "Palo Alto",
    region: "CA",
    country: "US",
    postal_code: "94303"
  },
  %{
    name: "Dunder Mifflin",
    email: "paper@dundermifflin.com",
    phone: "555-0111",
    address: "1725 Slough Avenue",
    city: "Scranton",
    region: "PA",
    country: "US",
    postal_code: "18503"
  },
  %{
    name: "Sterling Cooper",
    email: "ads@sterlingcooper.com",
    phone: "555-0112",
    address: "405 Madison Avenue",
    city: "New York",
    region: "NY",
    country: "US",
    postal_code: "10017"
  },
  %{
    name: "Bluth Company",
    email: "bananas@bluth.com",
    phone: "555-0113",
    address: "1 Sudden Valley",
    city: "Newport Beach",
    region: "CA",
    country: "US",
    postal_code: "92660"
  },
  %{
    name: "Globex Corporation",
    email: "hank@globex.com",
    phone: "555-0114",
    address: "123 Cypress Creek",
    city: "Cypress Creek",
    region: "FL",
    country: "US",
    postal_code: "33309"
  }
]

organizations =
  Enum.map(organizations_data, fn data ->
    org =
      Repo.insert!(%Organization{
        account_id: account.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        region: data.region,
        country: data.country,
        postal_code: data.postal_code
      })

    IO.puts("Created organization: #{org.name}")
    org
  end)

IO.puts("Created #{length(organizations)} organizations")

# Create contacts (distributed across organizations)
first_names = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "William",
  "Mia",
  "James",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Lucas",
  "Harper",
  "Henry",
  "Evelyn",
  "Alexander",
  "Luna",
  "Michael",
  "Camila",
  "Daniel",
  "Gianna",
  "Jackson",
  "Abigail",
  "Sebastian",
  "Ella",
  "Matthew",
  "Emily",
  "David",
  "Elizabeth",
  "Joseph",
  "Sofia",
  "Samuel",
  "Avery",
  "Ryan",
  "Chloe",
  "Andrew",
  "Scarlett",
  "Nathan",
  "Grace",
  "Christopher",
  "Zoey",
  "Joshua",
  "Lily",
  "Brandon",
  "Aria",
  "Kevin"
]

last_names = [
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "Hernandez",
  "King",
  "Wright",
  "Lopez",
  "Hill",
  "Scott",
  "Green",
  "Adams",
  "Baker",
  "Gonzalez",
  "Nelson",
  "Carter",
  "Mitchell",
  "Perez",
  "Roberts",
  "Turner",
  "Phillips",
  "Campbell",
  "Parker",
  "Evans",
  "Edwards",
  "Collins",
  "Stewart",
  "Sanchez",
  "Morris",
  "Rogers",
  "Reed",
  "Cook",
  "Morgan",
  "Bell",
  "Murphy",
  "Bailey"
]

cities = [
  {"New York", "NY", "US"},
  {"Los Angeles", "CA", "US"},
  {"Chicago", "IL", "US"},
  {"Houston", "TX", "US"},
  {"Phoenix", "AZ", "US"},
  {"Philadelphia", "PA", "US"},
  {"San Antonio", "TX", "US"},
  {"San Diego", "CA", "US"},
  {"Dallas", "TX", "US"},
  {"San Jose", "CA", "US"},
  {"Austin", "TX", "US"},
  {"Jacksonville", "FL", "US"},
  {"San Francisco", "CA", "US"},
  {"Seattle", "WA", "US"},
  {"Denver", "CO", "US"},
  {"Boston", "MA", "US"},
  {"Portland", "OR", "US"},
  {"Miami", "FL", "US"},
  {"Atlanta", "GA", "US"},
  {"Detroit", "MI", "US"}
]

contacts_count = 100

contacts =
  Enum.map(1..contacts_count, fn i ->
    first_name = Enum.random(first_names)
    last_name = Enum.random(last_names)
    {city, region, country} = Enum.random(cities)
    org = Enum.random(organizations)

    email_domain =
      org.name |> String.downcase() |> String.replace(~r/[^a-z]/, "") |> then(&"#{&1}.com")

    contact =
      Repo.insert!(%Contact{
        account_id: account.id,
        organization_id: org.id,
        first_name: first_name,
        last_name: last_name,
        email: "#{String.downcase(first_name)}.#{String.downcase(last_name)}#{i}@#{email_domain}",
        phone: "555-#{String.pad_leading(Integer.to_string(1000 + i), 4, "0")}",
        address:
          "#{Enum.random(100..9999)} #{Enum.random(["Main", "Oak", "Pine", "Elm", "Cedar", "Maple", "Park", "Lake", "Hill", "River"])} #{Enum.random(["St", "Ave", "Blvd", "Dr", "Ln", "Rd", "Way", "Ct"])}",
        city: city,
        region: region,
        country: country,
        postal_code: String.pad_leading(Integer.to_string(Enum.random(10000..99999)), 5, "0")
      })

    if rem(i, 20) == 0 do
      IO.puts("Created #{i} contacts...")
    end

    contact
  end)

IO.puts("Created #{length(contacts)} contacts")

# Add a few deleted items for testing trashed filter
deleted_org =
  Repo.insert!(%Organization{
    account_id: account.id,
    name: "Defunct Corp (Deleted)",
    email: "gone@defunct.com",
    city: "Nowhere",
    deleted_at: DateTime.utc_now(:second)
  })

IO.puts("Created deleted organization: #{deleted_org.name}")

deleted_contact =
  Repo.insert!(%Contact{
    account_id: account.id,
    first_name: "Deleted",
    last_name: "Contact",
    email: "deleted@example.com",
    city: "Gone City",
    deleted_at: DateTime.utc_now(:second)
  })

IO.puts("Created deleted contact: #{deleted_contact.first_name} #{deleted_contact.last_name}")

deleted_user =
  Repo.insert!(%User{
    account_id: account.id,
    first_name: "Inactive",
    last_name: "User",
    email: "inactive@example.com",
    hashed_password: Bcrypt.hash_pwd_salt("secret"),
    owner: false,
    confirmed_at: DateTime.utc_now(:second),
    deleted_at: DateTime.utc_now(:second)
  })

IO.puts("Created deleted user: #{deleted_user.first_name} #{deleted_user.last_name}")

IO.puts("")
IO.puts("=== Seeding complete! ===")
IO.puts("")
IO.puts("Demo login credentials:")
IO.puts("  Email: johndoe@example.com")
IO.puts("  Password: secret")
IO.puts("")
IO.puts("Summary:")
IO.puts("  - 1 account")
IO.puts("  - #{1 + length(users) + 1} users (including 1 owner and 1 deleted)")
IO.puts("  - #{length(organizations) + 1} organizations (including 1 deleted)")
IO.puts("  - #{length(contacts) + 1} contacts (including 1 deleted)")
